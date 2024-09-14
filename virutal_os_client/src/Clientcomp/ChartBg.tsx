"use client"
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  // padding: theme.spacing(2),
  textAlign: "center",
  
}));
const ChartBg = ({ children }: { children: React.ReactNode }) => {
  return <Item>{children}</Item>;
};
export default ChartBg;
