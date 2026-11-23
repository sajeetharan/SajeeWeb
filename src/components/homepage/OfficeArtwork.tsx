import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { socialProfiles } from "../NavbarSocialLinks";
import styles from "./DeveloperDesk.module.scss";

export type OfficeObjectKind =
  | "noticeboard"
  | "notebook"
  | "microphone"
  | "coffee"
  | "trophy"
  | "robot"
  | "github"
  | "instagram";

const instagramPath =
  "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077";

function Plant({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-29 0H29L23 43H-22Z" fill="var(--office-paper)" />
      <path
        d="M0 0Q-8-46 7-94M1-12Q29-49 31-71M-1-24Q-30-49-35-68"
        fill="none"
      />
      <g fill="var(--office-leaf)">
        <path d="M6-77Q-17-104 7-121Q27-101 6-77Z" />
        <path d="M0-38Q-46-31-43-71Q-6-70 0-38Z" />
        <path d="M8-27Q9-66 46-61Q45-23 8-27Z" />
        <path d="M-1-8Q-34-3-31-33Q-7-37-1-8Z" />
      </g>
    </g>
  );
}

export function OfficeBackground(): JSX.Element {
  const awardsBase = useBaseUrl("/img/awards/thumbnails/");
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 1200 800"
      width="1200"
      height="800"
      role="img"
      aria-label="An original illustrated office with a lifelike portrait of Sajeetharan, independently illustrated navigation objects, a keyboard, laptop, cloud monitor, books, plants, and a phone. A Microsoft logo is on his shirt, with framed Microsoft MVP (2017-2019) and Google Developer Expert award photographs on the wall."
      stroke="var(--office-ink)"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <defs>
        <linearGradient id="office-wall-depth" x2="1" y2="1">
          <stop stopColor="var(--office-paper)" />
          <stop offset="0.65" stopColor="var(--office-wall)" />
          <stop offset="1" stopColor="var(--office-floor)" />
        </linearGradient>
        <linearGradient id="office-desk-depth" x2="0" y2="1">
          <stop stopColor="var(--office-wood-light)" />
          <stop offset="0.7" stopColor="var(--office-wood)" />
          <stop offset="1" stopColor="var(--office-wood-dark)" />
        </linearGradient>
        <pattern
          id="office-chair-mesh"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="12"
            height="12"
            fill="var(--office-chair)"
            stroke="none"
          />
          <path
            d="M0 0L12 12M12 0L0 12"
            stroke="var(--office-chair-line)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <path d="M0 0H1200V800H0Z" fill="url(#office-wall-depth)" stroke="none" />
      <path d="M0 477H1200V800H0Z" fill="var(--office-floor)" stroke="none" />
      <path d="M0 482H1200" stroke="var(--office-wood-dark)" />
      <path d="M58 104L329 116V379L58 365Z" fill="var(--office-wood)" />
      <path d="M69 115L317 127V365L69 352Z" fill="var(--office-cork)" />
      <g fill="var(--office-paper)">
        <path d="M255 149L299 151V214L255 213Z" />
        <path d="M97 276L159 272V334L97 338Z" />
        <path d="M220 279L282 275V338L220 342Z" />
      </g>
      <g fill="var(--office-blue)">
        <circle cx="278" cy="151" r="4" />
        <circle cx="129" cy="275" r="4" />
        <circle cx="251" cy="277" r="4" />
      </g>
      <path d="M37 61L347 73V93L37 82Z" fill="var(--office-wood)" />
      <g>
        <path d="M95 9H115V64H95Z" fill="var(--office-blue)" />
        <path d="M116 17H138V66H116Z" fill="var(--office-coral)" />
        <path d="M139 5H158V67H139Z" fill="var(--office-gold)" />
        <path d="M159 14H177V68H159Z" fill="var(--office-teal)" />
        <path d="M185 23L204 20L212 71L194 72Z" fill="var(--office-lilac)" />
        <Plant x={275} y={36} scale={0.75} />
      </g>
      <path
        d="M32-15Q-12 97 42 141Q13 204 28 263Q-3 338 16 407"
        fill="none"
        stroke="var(--office-leaf)"
        strokeWidth="7"
      />
      <g fill="var(--office-leaf)">
        <path d="M33 56Q-5 32 8 5Q46 9 33 56ZM33 93Q61 52 82 74Q65 108 33 93ZM29 194Q-11 169 1 145Q37 142 29 194ZM27 250Q64 216 69 246Q53 270 27 250ZM13 331Q-14 303 3 288Q30 302 13 331Z" />
      </g>
      <g transform="translate(350 8)" data-office-award="mvp">
        <rect width="188" height="124" rx="3" fill="var(--office-wood)" />
        <rect
          x="5"
          y="5"
          width="178"
          height="114"
          fill="var(--office-paper)"
          strokeWidth="1"
        />
        <image
          href={`${awardsBase}mvp.webp`}
          x="10"
          y="10"
          width="168"
          height="84"
          preserveAspectRatio="xMidYMid meet"
        />
        <text
          x="94"
          y="111"
          textAnchor="middle"
          fontSize="14"
          fill="var(--office-ink)"
          stroke="none"
        >
          MVP 2017-2019
        </text>
      </g>
      <g transform="translate(642 8)" data-office-award="gde">
        <rect width="124" height="232" rx="3" fill="var(--office-wood)" />
        <rect
          x="5"
          y="5"
          width="114"
          height="222"
          fill="var(--office-paper)"
          strokeWidth="1"
        />
        <image
          href={`${awardsBase}gde.webp`}
          x="10"
          y="10"
          width="104"
          height="169"
          preserveAspectRatio="xMidYMid meet"
        />
        <text
          x="62"
          y="196"
          textAnchor="middle"
          fontSize="12"
          fill="var(--office-ink)"
          stroke="none"
        >
          Google Developer
        </text>
        <text
          x="62"
          y="214"
          textAnchor="middle"
          fontSize="14"
          fill="var(--office-ink)"
          stroke="none"
        >
          Expert
        </text>
      </g>
      <path d="M782 124L1097 105L1114 372L794 389Z" fill="var(--office-ink)" />
      <path
        d="M793 135L1085 118L1101 359L805 376Z"
        fill="var(--office-screen)"
        stroke="var(--office-blue)"
      />
      <path d="M929 382L943 450H1011L981 379" fill="var(--office-chair)" />
      <path d="M905 449H1028L1051 464H884Z" fill="var(--office-chair)" />
      <g fill="var(--office-cloud)" stroke="none">
        <path d="M877 222A31 31 0 0 1 925 185A38 38 0 0 1 995 198A28 28 0 0 1 1002 252H886A16 16 0 0 1 877 222Z" />
        <path
          d="M1031 166A17 17 0 0 1 1057 145A22 22 0 0 1 1086 166A14 14 0 0 1 1085 193H1041A15 15 0 0 1 1031 166Z"
          opacity="0.6"
        />
      </g>
      <path
        d="M833 246H950V337H833Z"
        fill="var(--office-screen)"
        stroke="var(--office-teal)"
      />
      <path
        d="M971 280H1077V343H971Z"
        fill="var(--office-screen)"
        stroke="var(--office-teal)"
      />
      <g strokeWidth="5">
        <path
          d="M846 263H875M846 299H864M985 295H1011"
          stroke="var(--office-coral)"
        />
        <path
          d="M846 275H927M846 311H909M985 307H1060"
          stroke="var(--office-gold)"
        />
        <path
          d="M859 287H936M859 324H898M999 320H1042"
          stroke="var(--office-teal)"
        />
      </g>
      <path
        d="M913 180V162H977M1062 200V259H1034"
        fill="none"
        stroke="var(--office-teal)"
      />
      <path
        d="M350 600V379Q350 280 446 279H663Q755 279 764 372L790 609Z"
        fill="var(--office-chair)"
      />
      <path
        d="M369 576V381Q369 300 446 300H657Q735 300 741 380L765 579Z"
        fill="url(#office-chair-mesh)"
      />
      <path
        d="M314 577Q287 440 356 414M780 579Q817 446 744 420"
        fill="none"
        strokeWidth="15"
      />
      <path d="M1023 419L1200 425V720L1023 697Z" fill="var(--office-wood)" />
      <path
        d="M1034 433L1200 439V493L1034 486ZM1034 498L1200 506V561L1034 552Z"
        fill="var(--office-wood-light)"
      />
      <path d="M1081 455L1137 459M1081 522L1137 526" strokeWidth="8" />
      <Plant x={1166} y={397} scale={1.05} />
      <path d="M0 551L1200 520V719L0 765Z" fill="url(#office-desk-depth)" />
      <path d="M0 719L1200 680V729L0 776Z" fill="var(--office-wood)" />
      <path
        d="M0 757L1200 711M58 702L324 693M877 671L1126 664M213 588L335 584"
        fill="none"
        stroke="var(--office-wood-dark)"
        strokeWidth="2"
        opacity="0.5"
      />
      <path d="M82 773V800M1117 736V800" strokeWidth="24" />
      <ellipse
        cx="500"
        cy="631"
        rx="116"
        ry="23"
        fill="var(--office-wood-dark)"
        opacity="0.14"
        stroke="none"
      />
      <g transform="translate(-98 0)" data-office-keyboard>
        <path
          d="M502 557L690 541L921 640L671 684Z"
          fill="var(--office-metal)"
        />
        <g fill="var(--office-chair)" strokeWidth="1.5">
          <path d="M518 563L537 562L550 571L531 573ZM541 561L560 560L573 569L554 571ZM531 577L550 575L564 585L545 587ZM567 582L584 580L598 590L581 592ZM545 591L564 589L577 599L558 601Z" />
          <g className={styles.pressedKey} data-character-part="key">
            <path
              d="M554 575L572 573L584 583L566 585Z"
              fill="var(--office-teal)"
            />
            <text
              x="562"
              y="580"
              fontSize="5"
              fill="var(--office-ink)"
              stroke="none"
            >
              Tab
            </text>
          </g>
        </g>
      </g>
      <path
        d="M979 634Q1039 604 1027 576Q1023 560 971 562"
        fill="none"
        strokeWidth="4"
      />
      <path
        d="M985 602Q1026 596 1044 633Q1024 653 987 640Z"
        fill="var(--office-chair)"
      />
      <path d="M1005 603L1015 625" fill="none" stroke="var(--office-metal)" />
      <g transform="translate(387 660)" fill="var(--office-chair)">
        <path d="M-41 3Q-53-58-5-62Q49-61 50-1" fill="none" strokeWidth="15" />
        <rect x="-52" y="-28" width="24" height="51" rx="10" />
        <rect x="32" y="-28" width="24" height="51" rx="10" />
      </g>
      <Plant x={1138} y={78} scale={0.7} />
      <path d="M1088 110L1200 103V119L1088 128Z" fill="var(--office-wood)" />
      <g transform="translate(1134 608)">
        <path
          d="M-24 0L-30-57M0 0L-4-79M19 0L32-69"
          strokeWidth="8"
          stroke="var(--office-blue)"
        />
        <path
          d="M-8 0L-16-68M14 0L12-54"
          strokeWidth="8"
          stroke="var(--office-gold)"
        />
        <path d="M-38-21H39L31 46H-31Z" fill="var(--office-chair)" />
        <path
          d="M-27-10L27 31M-27 10L13 37M-14-17L32 20"
          stroke="var(--office-chair-line)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

const characterPoses = ["phone", "tab", "pray"] as const;
export type OfficeCharacterPose = (typeof characterPoses)[number];

export function OfficeCharacter({
  pose,
}: {
  pose: OfficeCharacterPose;
}): JSX.Element {
  const characterBase = useBaseUrl("/img/office-character/");
  return (
    <svg
      className={styles.character}
      viewBox="0 0 1200 800"
      aria-hidden="true"
      focusable="false"
      stroke="var(--office-ink)"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <g data-character-part="portrait">
        {characterPoses.map((item) => (
          <image
            key={item}
            href={`${characterBase}${item}.webp`}
            className={styles.characterPose}
            data-character-pose={item}
            x="360"
            y="82"
            width="384"
            height="512"
            opacity={item === pose ? 1 : 0}
          />
        ))}
        <g
          transform="translate(625 362)"
          data-office-brand="microsoft"
          stroke="none"
        >
          <rect width="42" height="42" rx="4" fill="var(--office-paper)" />
          <rect x="5" y="5" width="15" height="15" fill="#f25022" />
          <rect x="22" y="5" width="15" height="15" fill="#7fba00" />
          <rect x="5" y="22" width="15" height="15" fill="#00a4ef" />
          <rect x="22" y="22" width="15" height="15" fill="#ffb900" />
        </g>
      </g>
    </svg>
  );
}

export function OfficeLaptop(): JSX.Element {
  return (
    <svg
      className={styles.foreground}
      viewBox="0 0 1200 800"
      aria-hidden="true"
      focusable="false"
      stroke="var(--office-ink)"
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="office-laptop-depth" x2="1" y2="1">
          <stop stopColor="var(--office-paper)" />
          <stop offset="0.45" stopColor="var(--office-metal)" />
          <stop offset="1" stopColor="var(--office-laptop)" />
        </linearGradient>
      </defs>
      <path
        d="M612 414L959 389Q978 388 974 411L941 612Q939 627 919 631L582 659Q565 660 569 642L604 430Z"
        fill="var(--office-metal)"
      />
      <path
        d="M621 423L958 400L928 613L583 645Z"
        fill="url(#office-laptop-depth)"
        stroke="var(--office-paper)"
        strokeWidth="1.5"
      />
      <path d="M608 653L919 628L899 641L630 665Z" fill="var(--office-chair)" />
    </svg>
  );
}

export function OfficeObject({
  kind,
}: {
  kind: OfficeObjectKind;
}): JSX.Element {
  const profile = socialProfiles.find((item) => item.name === "GitHub");
  if (!profile)
    throw new Error("The office artwork requires a GitHub profile.");
  let artwork: React.ReactNode;
  let viewBox = "0 0 160 200";
  switch (kind) {
    case "noticeboard":
      viewBox = "0 0 200 160";
      artwork = (
        <>
          <path
            d="M15 17L184 24L179 148L17 140Z"
            fill="var(--office-wood-dark)"
            opacity="0.22"
            stroke="none"
          />
          <path d="M10 10L180 17L175 141L12 133Z" fill="var(--office-paper)" />
          <circle cx="111" cy="15" r="7" fill="var(--office-blue)" />
          <text className={styles.wallNote} x="95" y="68">
            My
          </text>
          <text className={styles.wallNote} x="95" y="105">
            Projects
          </text>
        </>
      );
      break;
    case "notebook":
      artwork = (
        <>
          <path
            d="M8 159L135 127L150 153L20 185L8 179Z"
            fill="var(--office-chair)"
          />
          <path
            d="M13 156L134 125L147 146L25 177Z"
            fill="var(--office-paper)"
          />
          <path
            d="M9 126L135 96L151 122L24 156L10 149Z"
            fill="var(--office-blue)"
          />
          <path
            d="M14 132L142 103L145 118L24 148Z"
            fill="var(--office-paper)"
          />
          <path
            d="M8 102L134 74L148 96L20 129L9 122Z"
            fill="var(--office-coral)"
          />
          <path d="M13 107L138 80L142 92L22 120Z" fill="var(--office-paper)" />
          <path
            d="M8 77L133 49L147 71L19 104L8 97Z"
            fill="var(--office-gold)"
          />
          <path d="M13 81L137 56L141 68L20 94Z" fill="var(--office-paper)" />
          <path d="M8 50L133 24L147 47L18 79L8 73Z" fill="var(--office-teal)" />
          <path d="M13 55L136 30L140 44L20 70Z" fill="var(--office-paper)" />
          <path d="M7 28L133 3L144 22L18 54L7 48Z" fill="var(--office-blue)" />
          <path
            d="M26 180V186M44 175V181M62 171V177M80 166V172M98 162V168M116 157V163"
            fill="none"
            strokeWidth="2"
          />
        </>
      );
      break;
    case "microphone":
      viewBox = "0 0 140 260";
      artwork = (
        <>
          <ellipse
            cx="70"
            cy="237"
            rx="49"
            ry="14"
            fill="var(--office-chair)"
          />
          <path d="M66 149H79V234H66Z" fill="var(--office-metal)" />
          <path d="M39 117V154Q70 182 99 151V111" fill="none" strokeWidth="8" />
          <g transform="rotate(13 72 91)">
            <rect
              x="42"
              y="16"
              width="65"
              height="139"
              rx="28"
              fill="var(--office-chair)"
            />
            <path
              d="M46 65H102M54 30L96 49M48 42L101 64M47 55L98 78"
              stroke="var(--office-metal)"
              strokeWidth="2"
            />
            <path
              d="M47 86H101V133Q77 153 47 133Z"
              fill="var(--office-metal)"
            />
            <circle cx="76" cy="114" r="10" fill="var(--office-chair)" />
            <circle
              cx="76"
              cy="114"
              r="4"
              fill="var(--office-teal)"
              stroke="none"
            />
          </g>
          <circle cx="39" cy="127" r="8" fill="var(--office-metal)" />
          <circle cx="99" cy="127" r="8" fill="var(--office-metal)" />
        </>
      );
      break;
    case "coffee":
      artwork = (
        <>
          <ellipse cx="76" cy="173" rx="66" ry="17" fill="var(--office-wood)" />
          <path
            d="M115 53Q162 44 151 105Q141 126 113 122"
            fill="none"
            stroke="var(--office-teal)"
            strokeWidth="15"
          />
          <path
            d="M26 37H121L114 150Q78 177 32 149Z"
            fill="var(--office-teal)"
          />
          <path
            d="M38 55L44 141"
            fill="none"
            stroke="var(--office-cloud)"
            strokeWidth="5"
          />
          <ellipse cx="73" cy="37" rx="47" ry="15" fill="var(--office-paper)" />
          <ellipse
            cx="73"
            cy="39"
            rx="38"
            ry="9"
            fill="var(--office-coffee)"
            stroke="none"
          />
          <path
            className={styles.steam}
            d="M54 14Q44 1 53-9M82 12Q94 0 83-13"
            fill="none"
            stroke="var(--office-paper)"
            strokeWidth="4"
          />
        </>
      );
      break;
    case "trophy":
      artwork = (
        <>
          <path d="M29 175H130L143 193H17Z" fill="var(--office-chair)" />
          <path d="M35 145H126L131 176H29Z" fill="var(--office-metal)" />
          <path d="M71 113H88V146H71Z" fill="var(--office-gold)" />
          <path d="M79 8L121 52L90 122H70L40 53Z" fill="var(--office-gold)" />
          <path
            d="M79 8L74 108L40 53ZM79 8L121 52L83 110Z"
            fill="var(--office-paper)"
            opacity="0.38"
          />
          <path
            className={styles.sparkle}
            d="M126 13V33M117 23H135M24 79V93M17 86H31"
            fill="none"
            stroke="var(--office-gold)"
            strokeWidth="4"
          />
        </>
      );
      break;
    case "robot":
      artwork = (
        <>
          <path d="M78 28V11" strokeWidth="5" />
          <circle cx="78" cy="10" r="8" fill="var(--office-teal)" />
          <path
            d="M56 119L49 164L73 177H104L125 159L112 117Z"
            fill="var(--office-metal)"
          />
          <path
            d="M48 145Q19 160 20 181L34 183L60 155M121 140Q143 151 145 175L130 181L109 155"
            fill="var(--office-paper)"
          />
          <path
            d="M57 163L53 187L76 193L81 172M100 172L101 193L126 189L118 165"
            fill="var(--office-metal)"
          />
          <rect
            x="31"
            y="32"
            width="105"
            height="91"
            rx="23"
            fill="var(--office-paper)"
          />
          <rect
            x="40"
            y="44"
            width="85"
            height="62"
            rx="11"
            fill="var(--office-screen)"
          />
          <g
            className={styles.robotEyes}
            stroke="var(--office-teal)"
            strokeWidth="5"
            fill="none"
          >
            <path d="M53 77Q62 61 70 77M93 77Q102 61 111 77" />
          </g>
          <path
            d="M73 91Q83 99 95 90"
            fill="none"
            stroke="var(--office-teal)"
          />
        </>
      );
      break;
    case "github":
      viewBox = "0 0 120 120";
      artwork = (
        <g transform="rotate(-8 60 60)">
          <circle cx="60" cy="60" r="43" fill="var(--office-paper)" />
          <path
            d={profile.path}
            transform="translate(33 33) scale(2.25)"
            fill="var(--office-hair)"
            stroke="none"
          />
        </g>
      );
      break;
    case "instagram":
      viewBox = "0 0 160 160";
      artwork = (
        <>
          <path d="M21 21L133 17L141 138L25 143Z" fill="var(--office-paper)" />
          <path d="M30 34L123 30L129 120L35 124Z" fill="var(--office-lilac)" />
          <path
            d={instagramPath}
            transform="translate(49 47) scale(2.6)"
            fill="var(--office-paper)"
            stroke="none"
          />
          <path
            d="M65 12L91 10L93 29L67 31Z"
            fill="var(--office-gold)"
            opacity="0.8"
            stroke="none"
          />
        </>
      );
      break;
  }
  return (
    <svg
      className={styles.objectArt}
      viewBox={viewBox}
      data-object-art={kind}
      aria-hidden="true"
      focusable="false"
      stroke="var(--office-ink)"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <g className={styles.objectDrawing}>{artwork}</g>
    </svg>
  );
}
