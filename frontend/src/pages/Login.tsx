import "../index.css";
import whiteBall from "../assets/white_ball.svg";
import library from "../assets/library.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

type User = {
    id: number;
    login: string;
    password: string;
};

const Login = () => {
    const [isReg, setIsReg] = useState(true);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState<User[]>([]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!login.trim()) {
            alert("Логин не может быть пустым");
            return;
        }

        try {
            await axios.post("http://localhost:8080/register", {
                login,
                password,
            });
            alert("Вы успешно зарегистрировались!");
            setLogin("");
            setPassword("");
        } catch (err) {
            alert("Ошибка регистрации");
            console.error(err);
        }
    };


    const fetchUsers = async () => {
        try {
            const res = await axios.get<User[]>("http://localhost:8080/users");
            setUsers(res.data);
        } catch (err) {
            console.error("Ошибка загрузки пользователей", err);
        }
    };

    useEffect(() => {
        if (!isReg) {
            fetchUsers();
        }
    }, [isReg]);

    return (
        <main className="flex w-[1920px] max-h-[100vh] h-[1080px] border-[#000] rounded-[20px]">
            <aside
                className="rounded-l-[15px] relative w-[720px] max-h-[100vh]"
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${library}) lightgray 50% / cover no-repeat`,
                }}
            >
                <section className="relative flex top-[300px] left-[70px] flex-col gap-[20px] w-[600px] h-[350px]">
                    <img className="w-[45px] h-[45px]" src={whiteBall} alt="нету" />
                    <h1
                        className="text-[64px] text-[#fff] font-[600] leading-[130%] m-[0px]"
                        style={{ fontFamily: "Poppins, serif" }}
                    >
                        GoAnime
                    </h1>
                    <p
                        style={{ fontFamily: `"Raleway", serif` }}
                        className="text-[24px] text-[#fff] font-[600] leading [130%] m-[0]"
                    >
                        Удобная и функциональная<br />онлайн аниме библиотека
                    </p>
                </section>
                <section className="flex flex-col gap-[15px] absolute right-[0px] top-[60px]">
                    <button
                        className={`font-semibold text-[18px] w-[120px] h-[50px] inline-flex justify-center items-center px-[35px] py-[16px] rounded-l-[8px] transition-all border-transparent
                            ${isReg ? "bg-[#6D84F9] text-[#fff]" : "bg-[rgba(109,132,249,0.50)] text-[#fff]/50"}`}
                        style={{ fontFamily: `"Raleway", serif` }}
                        onClick={() => setIsReg(true)}
                    >
                        Регистрация
                    </button>
                    <button
                        className={`font-semibold text-[18px] w-[120px] h-[50px] inline-flex justify-center items-center px-[14px] py-[16px] rounded-l-[8px] transition-all border-transparent
                            ${!isReg ? "bg-[#6D84F9] text-[#fff]" : "bg-[rgba(109,132,249,0.50)] text-[#fff]/50"}`}
                        style={{ fontFamily: `"Raleway", serif` }}
                        onClick={() => setIsReg(false)}
                    >
                        Аккаунты
                    </button>
                </section>
            </aside>

            {isReg ? (
                <article className="bg-[#fff] w-[1200px] justify-center items-center align-center flex flex-col rounded-r-[20px]">
                    <div className="w-[576px] h-fit">
                        <section>
                            <h2
                                style={{ fontFamily: `"Raleway", serif` }}
                                className="text-[#27272a] justify-center text-[32px] font-medium mt-[0px]"
                            >
                                Регистрация
                            </h2>
                            <div className="w-[562px] h-[2px] bg-[#66666640] mb-[40px] mt-[40px]"></div>
                        </section>
                        <form onSubmit={handleRegister}>
                            <label
                                htmlFor="name"
                                style={{ fontFamily: `"Raleway", serif` }}
                                className="justify-start text-[#78716c] text-[16px] font-normal ml-[16px]"
                            >
                                Логин (никнейм)
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                className="w-[568px] h-[50px] rounded-[12px] bg-[#fff] mt-[6px] mb-[20px] border-[#666666]/35 border-solid border-[1px] text-[#000] text-[18px] pl-[10px]"
                                autoComplete="off"
                                required
                            />

                            <label
                                htmlFor="pw"
                                style={{ fontFamily: `"Raleway", serif` }}
                                className="justify-start text-[#78716c] text-[16px] font-normal relative left-[16px]"
                            >
                                Пароль
                            </label>
                            <input
                                type="password"
                                id="pw"
                                name="pw"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-[568px] h-[50px] rounded-[12px] bg-[#fff] mt-[6px] border-[#666666]/35 border-solid border-[1px] text-[#000] text-[18px] pl-[10px]"
                                required
                            />

                            <button
                                type="submit"
                                style={{ fontFamily: `"Raleway", serif` }}
                                className="relative left-[163px] bg-[#6D84F9] rounded-[25px] border-solid border-transparent flex justify-center align-center px-[85px] py-[17px] w-[250px] h-[70px] mt-[60px] text-[24px] text-[#fff] font-[700]"
                            >
                                Зарегистрироваться
                            </button>
                        </form>
                    </div>
                </article>
            ) : (
                <article className="bg-[#fff] w-[1200px] justify-start items-start p-[40px] flex flex-col gap-[20px] rounded-r-[20px] overflow-y-auto">
                    <h2 className="text-[32px] font-bold text-[#27272a]" style={{ fontFamily: `"Raleway", serif` }}>
                        Все пользователи:
                    </h2>
                    <section className="flex flex-col gap-[10px] text-[20px] text-[#333]">
                        {users.map((user) => (
                            <div key={user.id} className="border-b border-[#ccc] pb-[5px] w-fit flex flex-row gap-[50px]">
                                <div>{user.login}</div>
                                <div>{user.password}</div>
                            </div>
                        ))}
                    </section>
                </article>
            )}
        </main>
    );
};

export default Login;
