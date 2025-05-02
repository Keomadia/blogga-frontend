import { Typography, Box } from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { TypographyVariant } from "@mui/material/styles";


interface LogoTextProps {
    varian: TypographyVariant;
}

export default function LogoText({ varian}: LogoTextProps) {
    const fontFamily = "Gluten";

    return (
        <Box display="flex" alignItems="center">
            <SignalCellularAltIcon sx={{ marginRight: 1, fontSize: '2.5rem' }} />
            <Typography variant={varian}  sx={{ fontFamily: fontFamily, display: 'inline', fontSize: '3rem' }}>BloggA</Typography>
        </Box>
    );
}