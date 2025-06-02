import homePic from "../assets/headerBar/home.svg";
import ongoingPic from "../assets/headerBar/ongoing.svg";
import bestPic from "../assets/headerBar/best.svg";
import popularPic from "../assets/headerBar/popular.svg";
import searchPic from "../assets/headerBar/search.svg";
import zoloPic from "../assets/headerBar/i.webp";
import {useNavigate} from "react-router-dom";

interface headerProps {
    values: headerProp;
}

export type headerProp = {
    gap_first: number;
    gap_second: number;
}


export default function Header({values} : headerProps) {
    const navigate = useNavigate();
    return (
        <header className="h-[88px] flex flex-row items-center bg-[#A4C2E7] w-[1920px]" style={{gap: `${values.gap_first}px`}}>
            <nav
                className="flex flex-row gap-[40px] items-center bg-[#fff] px-[36px] py-[5px] w-[463px] h-fit rounded-[10px] ml-[100px]">
                <section id="mainpage" className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/home")}>
                    <img src={homePic} className="w-[24px] h-[24px]" alt=""/>
                    <h3 className="text-[#000] text-[14px]">Главная</h3>
                </section>
                <section id="airing" className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/list/popularity_ongoing")}>
                    <img src={ongoingPic} className="w-[24px] h-[24px]" alt=""/>
                    <h3 className="text-[#000] text-[14px]">Онгоинг</h3>
                </section>
                <section id="best" className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/list/ranked")}>
                    <img src={bestPic} className="w-[24px] h-[24px]" alt=""/>
                    <h3 className="text-[#000] text-[14px]">Лучшее</h3>
                </section>
                <section id="popular" className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/list/popularity")}>
                    <img src={popularPic} className="w-[24px] h-[24px]" alt=""/>
                    <h3 className="text-[#000] text-[14px]">Популярное</h3>
                </section>
            </nav>
            <section
                className="h-[52px] flex flex-row items-center gap-[6px] bg-[#fff] rounded-[10px] w-[455px]" style={{marginLeft: `${values.gap_second - values.gap_first}px`}}>
                <img src={searchPic} alt="" className="ml-[6px]"/>
                <input type="text" placeholder="Поиск" className="text-[#000] w-[400px]"/>
            </section>
            <section className="w-[74px] h-[74px] flex flex-row rounded-[10px] items-center bg-[#fff]">
                <img src={zoloPic} alt="" className="ml-[7px] rounded-[10px] w-[60px] h-[60px]"/>
            </section>
        </header>
    )
}