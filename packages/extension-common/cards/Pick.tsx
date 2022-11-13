import { Tooltip } from "@nextui-org/react";
import { CSSProperties } from "react";

export default function Pick(props: { style: CSSProperties; onPick: (value: string) => void }) {
  return (
    <div style={{ ...props.style }}>
      <Tooltip content="Add to dashboard" placement="top">
        <svg
          width="16"
          height="16"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onPick("pick");
          }}
          style={{ display: "inline-block", marginTop: "-1px" }}
        >
          <defs>
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#7de2ac" /> <stop offset="50%" stop-color="#389dfa" />{" "}
              <stop offset="100%" stop-color="#9f50ff" />{" "}
            </linearGradient>
          </defs>

          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.60444 0.687639C4.84294 0.437454 7.15706 0.437454 9.39556 0.687639C10.6448 0.827256 11.6526 1.81147 11.7993 3.06561C12.0669 5.35409 12.0669 7.66597 11.7993 9.95445C11.6526 11.2086 10.6448 12.1928 9.39556 12.3324C7.15705 12.5826 4.84294 12.5826 2.60444 12.3324C1.35524 12.1928 0.347427 11.2086 0.200744 9.95445C-0.0669147 7.66597 -0.0669147 5.35409 0.200744 3.06561C0.347427 1.81147 1.35524 0.827256 2.60444 0.687639ZM6.00001 2.86855C6.30212 2.86855 6.54704 3.11347 6.54704 3.41558V5.963H9.09448C9.39659 5.963 9.6415 6.20791 9.6415 6.51003C9.6415 6.81214 9.39659 7.05705 9.09448 7.05705H6.54704V9.60447C6.54704 9.90658 6.30212 10.1515 6.00001 10.1515C5.6979 10.1515 5.45298 9.90658 5.45298 9.60447V7.05705H2.90558C2.60347 7.05705 2.35856 6.81214 2.35856 6.51003C2.35856 6.20791 2.60347 5.963 2.90558 5.963H5.45299V3.41558C5.45299 3.11347 5.6979 2.86855 6.00001 2.86855Z"
            fill="url(#linear)"
          />
        </svg>
      </Tooltip>
    </div>
  );
}
