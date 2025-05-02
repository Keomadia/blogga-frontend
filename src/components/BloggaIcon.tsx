import SvgIcon from '@mui/material/SvgIcon';

export default function BloggaIcon() {
  return (
    <SvgIcon sx={{ height: 24, width: 120, mr: 2 }}>
    <svg
      width="200"
      height="15"
      viewBox="0 0 150 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#4dabdf" d="M2 10h4v4H2z"/>
      <path fill="#4dabdf" d="M8 8h4v6H8z" />
      <path fill="#4dabdf" d="M14 6h4v8h-4z"/>
      <path fill="#4dabdf" d="M20 4h4v10h-4z"/>
      <text
        x="30"
        y="15"
        fontFamily="Gluten, sans-serif"
        fontSize="24"
        fill="#4dabdf"
      >
        BloggA
      </text>

    </svg>
    </SvgIcon>
  );
}
