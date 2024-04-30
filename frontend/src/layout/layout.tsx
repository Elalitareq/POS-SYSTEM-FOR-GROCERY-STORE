import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/SIdeBar";
import styled from "styled-components";
import { devices } from "../components/styled/responisve.styled";
import Loder from "../components/loder/Loder";
import { createContext, useState } from "react";

const DashboardLoayout = styled.div`
    margin-right: 0;
    margin-top: 70px;
    @media ${devices.tablet} {
        margin-right: 250px;
    }
    @media ${devices.laptop} {
        margin-right: 250px;
    }
    @media ${devices.laptopL} {
        margin-right: 250px;
    }
    @media ${devices.desktop} {
        margin-right: 250px;
    }
`;

interface LoaderContextType {
    setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoderContext = createContext<LoaderContextType | null>(null);

function Layout() {
    const [loder, setLoader] = useState(false);
    return (
        <>
            <SideBar />
            <DashboardLoayout>
                {loder && <Loder />}
                <LoderContext.Provider value={{ setLoader }}>
                    <Outlet />
                </LoderContext.Provider>
            </DashboardLoayout>
        </>
    );
}

export default Layout;
