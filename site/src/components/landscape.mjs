// Decorative terrain mesh. It is not a map or a named mountain range.
export function landscape() {
  return `<svg class="landscape" viewBox="0 0 1200 240" fill="none" aria-hidden="true" focusable="false">
    <g class="landscape__mesh" stroke="currentColor" stroke-width=".7" stroke-linejoin="round" opacity=".42">
      <path d="M0 173 83 155 134 163 226 99 252 119 327 54 361 92 390 71 447 136 494 109 570 159 658 137 725 163 809 95 841 117 901 47 936 77 958 62 1042 147 1110 128 1200 165"/>
      <path d="M0 240 83 155 140 240 226 99 290 240 327 54 407 240 390 71 487 240 494 109 590 240 658 137 720 240 809 95 850 240 901 47 970 240 958 62 1080 240 1110 128 1200 240M0 196 156 181 298 153 421 176 570 185 700 191 835 160 965 150 1087 180 1200 196M0 217 177 206 311 195 438 205 590 210 720 217 850 198 970 195 1110 213 1200 220"/>
      <path d="M83 155 156 181 226 99m-70 82 142-28 29-99m-29 99 92-82m-92 82 149-17m-26 40 73-67m76 50 130 32 109-96m26 65 66-113m-66 113 123-98m7 88 77-3m-77 3 145-22"/>
    </g>
    <path class="landscape__ridge" d="M0 173 83 155 134 163 226 99 252 119 327 54 361 92 390 71 447 136 494 109 570 159 658 137 725 163 809 95 841 117 901 47 936 77 958 62 1042 147 1110 128 1200 165" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <g class="landscape__traces" stroke="currentColor" stroke-width="1" opacity=".7">
      <path d="M83 155v-46h61m183-55V20h84m247 117V86h58m185-39V14h72"/>
      <path d="M139 109h10m-5-5v10M406 20h10m-5-5v10M711 86h10m-5-5v10M968 14h10m-5-5v10"/>
    </g>
    <g fill="currentColor"><circle cx="83" cy="155" r="3"/><circle cx="327" cy="54" r="3"/><circle cx="658" cy="137" r="3"/><circle cx="901" cy="47" r="3"/></g>
  </svg>`;
}
