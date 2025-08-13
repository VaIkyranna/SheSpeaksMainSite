"use client"

import { useEffect, useRef, useState, useCallback, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, TrendingUp, MapPin } from "lucide-react"

// Pre-compile regular expressions for better performance
const categoryRegexes = {
  entertainment: /\b(movie|film|tv|television|show|series|netflix|hulu|disney|streaming|actor|actress|celebrity|music|album|song|artist|concert|performance|award|oscar|emmy|grammy|entertainment|hollywood|broadway|theater|theatre|drag|festival|culture|representation|character|role)\b/,
  politics: /\b(rights|law|legal|court|ruling|legislation|bill|policy|government|political|politics|congress|senate|parliament|election|vote|voting|campaign|candidate|president|minister|judge|supreme court|ban|banned|protect|protection|discrimination|equality|marriage|adoption)\b/,
  health: /\b(health|healthcare|medical|medicine|doctor|hospital|treatment|therapy|mental health|wellness|surgery|clinic|patient|disease|condition|diagnosis|prescription|vaccine|hormone|transition|gender|affirming|care)\b/,
  sports: /\b(sport|sports|athlete|team|championship|league|tournament|olympics|fifa|nfl|nba|mlb|nhl|soccer|football|basketball|baseball|tennis|golf|swimming)\b/,
  sportsContext: /\b(athlete|team|tournament|sport|player|coach|stadium|field|court|Olympic|championship)\b/,
  business: /\b(business|company|corporate|ceo|startup|entrepreneur|investment|finance|financial|economy|economic|market|stock|trade|industry|workplace|job|career|employment|work|office|inclusive|diversity)\b/,
  education: /\b(education|school|university|college|student|teacher|professor|academic|study|research|scholarship|graduation|campus|classroom|learning|youth|young|teen|teenager|child|children|kid|kids)\b/,
  technology: /\b(technology|tech|digital|app|software|internet|online|social media|facebook|twitter|instagram|tiktok|platform|ai|artificial intelligence|data|cyber|dating|app)\b/,
  community: /\b(community|social|activism|activist|protest|march|rally|movement|organization|charity|volunteer|support|advocacy|inclusion|diversity|pride|event|celebration|group|center|resource)\b/
}
