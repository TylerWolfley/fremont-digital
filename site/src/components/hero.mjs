import { business } from '../data/business.mjs';
import { arrow } from './icons.mjs';

export function hero() {
  return `<section class="editorial-hero" aria-labelledby="hero-heading"><div class="section-container">
    <img class="hero-monogram" src="/assets/brand/fremont-digital-monogram.webp" width="680" height="505" alt="" aria-hidden="true">
    <p class="hero-overline">Website design <span aria-hidden="true">/</span> Business automation</p>
    <h1 id="hero-heading">A website worth<br> <span>sending people to.</span></h1>
    <div class="hero-bottom"><p>I build websites that feel like your business—and connect the forms, bookings, and everyday tools behind them.</p><div><a class="button button--primary" href="/contact/?category=web-digital">Let’s talk about your project ${arrow}</a><p class="hero-credit">Tyler Wolfley · Coding since 2006</p></div></div>
    <div class="hero-baseline"><span>${business.location} <span aria-hidden="true">↗</span> Local & remote projects</span><a href="#services">Explore what I do <span aria-hidden="true">↓</span></a></div>
  </div></section>`;
}
