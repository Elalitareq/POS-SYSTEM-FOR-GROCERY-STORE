import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import useLinks from "../hooks/useLinks";

function Dashboard() {
  const { links } = useLinks();
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "30px",
      }}
    >
      {links.map((link) => (
        <Link
          to={link.link}
          key={link.link}
          style={{
            height: "250px",
            width: "250px",
            textDecoration: "none",
            color: "black",
            padding: "8px",
            display: "flex",
            border: "1px solid #bdbdbd",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <link.icon style={{ height: "200px", width: "200px" }} />
          {link.name}
        </Link>
      ))}
    </Container>
  );
}

export default Dashboard;
