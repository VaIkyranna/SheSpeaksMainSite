import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 }
    );
  }

  try {
    // Fetch the article HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    // Try to find OpenGraph image first
    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i);
    if (ogImageMatch && ogImageMatch[1]) {
      return NextResponse.json({ imageUrl: ogImageMatch[1] });
    }

    // Try to find Twitter card image
    const twitterImageMatch = html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]*)"/i);
    if (twitterImageMatch && twitterImageMatch[1]) {
      return NextResponse.json({ imageUrl: twitterImageMatch[1] });
    }

    // Try to find the first large image in the article
    const imgTagMatch = html.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
    if (imgTagMatch && imgTagMatch[1]) {
      let imageUrl = imgTagMatch[1];
      
      // Make relative URLs absolute
      if (imageUrl.startsWith('//')) {
        const urlObj = new URL(url);
        imageUrl = urlObj.protocol + imageUrl;
      } else if (imageUrl.startsWith('/')) {
        const urlObj = new URL(url);
        imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`;
      }
      
      return NextResponse.json({ imageUrl });
    }

    return NextResponse.json(
      { error: 'No image found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error extracting image:', error);
    return NextResponse.json(
      { error: 'Failed to extract image' },
      { status: 500 }
    );
  }
}
