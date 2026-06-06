# DESIGN.md

## Purpose

This document explains the design research direction, UX phases, content architecture, and visual strategy for HuisFeest.

The product is a real Netherlands-based service business. The design must create trust and desire, not just display information. The attached owner's manual strongly suggests a cinematic, scroll-led storytelling approach. We should use that language carefully and translate it into a food and celebration brand.

## Design thesis

HuisFeest should feel like a cross between:
- a luxury hospitality landing page
- an intimate editorial story
- a premium event booking site

It should not feel like:
- a generic catering company
- a party decoration shop
- a noisy marketplace
- a template SaaS landing page

## Core UX goals

1. Make the service instantly understandable.
2. Make the brand feel premium and warm.
3. Reduce booking friction.
4. Show enough visual inspiration to help people imagine their event.
5. Make WhatsApp and inquiry actions obvious without making the site look salesy.
6. Keep enough structure so a future marketplace can evolve from the same foundation.

## Audience assumptions

### Primary audiences
- young professionals planning birthdays or house gatherings
- couples planning romantic dinners or proposals
- families planning anniversaries, Eid meals, and home celebrations
- expats in the Netherlands who want easy bilingual booking

### Audience expectations
- elegant and easy process
- transparent service explanation
- confidence in quality
- dietary flexibility
- beautiful visual presentation
- mobile-friendly browsing

## Design style

### Keywords
- cinematic
- warm
- editorial
- intimate
- refined
- sensory
- calm luxury

### Color direction
Use a restrained palette:
- warm cream background
- dark charcoal text
- olive/forest green CTA accent
- soft champagne highlight

Optional subtle secondary tones:
- muted terracotta for tags
- warm gray for dividers and surfaces

### Typography
Recommended pairing:
- display: Playfair Display, Cormorant Garamond, or Instrument Serif
- body/UI: Inter, Satoshi, or General Sans

### Imagery
- close-up food shots
- hands setting tables
- candlelight / dinner ambiance
- overhead spreads
- soft motion moments
- smiling human scenes, but not cheesy stock-photo behavior

## Cinematic scroll adaptation

The owner's manual shows a strong pattern:
- sticky full-height section
- canvas-driven image sequence
- scroll-linked chapter text
- editorial transition into structured sections

For HuisFeest, adapt this into a hospitality narrative.

### Recommended scroll story chapters

#### Chapter 1 — Arrival
Kicker: chapter 01 · arrival  
Headline: your evening begins before the first bite  
Purpose: emotional opening, atmosphere, anticipation

#### Chapter 2 — Table
Kicker: chapter 02 · setting  
Headline: styled tables, fresh ingredients, thoughtful details  
Purpose: connect food + decoration

#### Chapter 3 — Celebration
Kicker: chapter 03 · gathering  
Headline: food, music, and moments that feel effortless  
Purpose: show social energy without chaos

#### Chapter 4 — Ease
Kicker: chapter 04 · hosting  
Headline: you host the memory, we handle the work  
Purpose: conversion toward booking

## Site architecture

### Public pages / sections
1. Home
2. Services
3. How it works
4. Packages
5. Gallery / occasions
6. About
7. FAQ
8. Contact / inquiry

### Recommended homepage structure
1. Header with bilingual toggle and CTA
2. Cinematic hero scroll
3. Quick service positioning section
4. Occasions grid
5. Packages section
6. How it works
7. Gallery / inspiration
8. Testimonials
9. FAQ
10. Inquiry CTA and footer

## Section-by-section design notes

### Header
- minimal transparent header over hero, then solid on scroll
- Dutch / English toggle
- primary CTA: request your event
- secondary CTA: WhatsApp

### Hero
- full-screen cinematic canvas section
- placeholder stock sequence first
- text chapters with localized scrim for readability
- progress/loading UI
- subtle enter button once sequence is ready

### Positioning section
Explain the promise quickly:
- private dining
- grazing and fruit styling
- decoration
- music and ambiance
- one coordinated experience

### Occasions grid
Show use cases:
- birthdays
- anniversaries
- proposals
- baby showers
- Eid gatherings
- home dinners

### Packages
Do not make the package section look like SaaS pricing cards. It should feel like editorial hospitality cards.

Suggested package levels:
- intimate table
- feast table
- celebration setup
- full hosting experience

### How it works
Use 3 or 4 steps:
1. tell us your occasion
2. choose your mood and menu direction
3. receive your plan
4. enjoy while we set it up

### Gallery
Should be filterable later, but for V1 can be a curated masonry layout or staggered editorial image grid.

### Testimonials
Even if initial testimonials are placeholders, design the section in a reusable way. Use real-looking structure, but do not fake detailed reviews in production.

### Inquiry section
The form should be short and warm. Collect:
- name
- phone / WhatsApp
- email
- date
- city/postcode
- guest count
- event type
- package interest
- dietary notes
- free text

## Dashboard design direction

The dashboard is internal, so it should be practical and calm.

### Admin dashboard pages
- login
- lead inbox
- lead detail
- statuses
- notes
- filters by date/status/source

### Dashboard UX principles
- clean neutral UI
- fast data entry
- mobile usable but desktop optimized
- no unnecessary visual theatrics

## Phases of design work

### Phase 0 — Research and framing
- review competitors
- define exact brand position
- collect visual references
- confirm package architecture
- define content hierarchy

### Phase 1 — Experience design
- information architecture
- wireframes
- motion concept
- cinematic story chapters
- bilingual content structure

### Phase 2 — Visual system
- palette
- typography
- spacing system
- section art direction
- imagery standards
- dashboard UI rules

### Phase 3 — Build-ready specs
- final section order
- responsive rules
- form UX logic
- admin flows
- media replacement plan

## Research checklist

Before final design decisions, research:
- Dutch private chef competitors
- Dutch event styling competitors
- bilingual hospitality websites
- cinematic scroll references from luxury hospitality and fashion
- WhatsApp-first conversion patterns
- Dutch trust signals for service businesses

## Important design constraints

- must load well on mobile
- cinematic hero cannot block the rest of the site from being accessible
- must allow easy replacement of placeholder media
- must not require heavy infrastructure for V1
- must support future marketplace expansion
- should stay elegant in both Dutch and English copy lengths

## Success criteria

The design is successful if a visitor can quickly understand:
- what HuisFeest does
- who it is for
- why it feels premium
- how to contact/book
- that the service is real and trustworthy
