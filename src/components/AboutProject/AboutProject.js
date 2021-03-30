import React, { useEffect, useState } from "react";
import Layout from "antd/lib/layout/layout";
import "./css/aboutProject.css";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import { Button, Collapse, Row, Col } from "antd";
import ClubCarousel from "./ClubCarousel";
import { getClubsByCategoryAndCity, getClubsByParameters } from "../../service/ClubService";
import { mapSearchParameters, searchParameters } from "../../context/SearchContext";

const AboutProject = () => {
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        getClubsByCategoryAndCity(mapSearchParameters).then(responce => {
            setClubs(responce);
            console.log(responce)
            console.log("RESOPNCE");
        })
    }, [mapSearchParameters.cityName])

    return (
        <Layout className="aboutProject global-padding">
            <div className="title"
                style={{ background: `url(${process.env.PUBLIC_URL}/static/images/service/about_project.png) center / cover` }}>
                <span className="text">Навчай українською</span>
                <span className="content">Ініціатива</span>

            </div>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Ми у соц. мережах</span>
                    <div className="links">
                        <a target="_blank" href="#"><TwitterOutlined className="icon" /></a>
                        <a target="_blank" href="#"><FacebookOutlined className="icon" /></a>
                        <a target="_blank" href="#"><GoogleOutlined className="icon" /></a>
                        <a target="_blank" href="#"><InstagramOutlined className="icon" /></a>
                    </div>
                </div>
                <div className="help-button">
                    <a target="blank" href="#"><Button className="flooded-button donate-button">Допомогти
                        проекту</Button> </a>
                </div>
            </div>
            <div className="content">
                <div className="about-info">
                    <div className="title-content">
                        Про ініціативу
                    </div>
                    <div className="content-text">
                        Ініціатива “Навчай українською” - це небайдужі громадяни, які об'єдналися, щоб популяризувати українську мову у сфері освіти.
                    </div>
                </div>
                <section className="organaizer" >
                    <div className="row">
                        <div className="col">
                            <img src={`${process.env.PUBLIC_URL}/static/images/service/profile_2.jpg`}></img>
                        </div>
                        <div className="col info">
                            <div className="text">
                                <span >
                                    Що зміниться, якщо в Україні всі розмовлятимуть українською? Чи змінить це ставлення громадян до своєї країни? Чи стане молодь більше поважати свій край? щось про те, чому вирішила заснувати ініціативу і кілька слів про себе)
                            </span>
                            </div>
                            <div className="name">
                                <span>Наталка Федечко</span>
                            </div>
                            <div className="position">
                                <span >Співорганізаторка Ініціативи “Навчай українською”</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col info">
                            <div className="text">
                                <span>
                                    Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.
                                </span>
                            </div>
                            <div className="name">
                                <span >Іванна Кобєлєва</span>
                            </div>
                            <div className="position">
                                <span>Засновниця проєкту</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={`${process.env.PUBLIC_URL}/static/images/service/profile_1.jpg`}></img>
                        </div>
                    </div>
                </section>
                <section className="sport-clubs">
                    <div className="title-content sport">
                        Ініціатива "Навчай українською" закликає викладачів спортивних секцій, тренерів навчати дітей українською мовою.
                    </div>
                    <div className="content-text sport desc">
                        Із 16 січня 2021 набуває чинності стаття 30 закону “Про забезпечення функціонування української мови як державної” про державну мову у сфері обслуговування споживачів. З 16 січня всі надавачі послуг, незалежно від форми власності, зобов’язані обслуговувати споживачів і надавати інформацію про товари і послуги державною мовою. Громадяни мають право отримати освітній послуги українською мовою у закладах позашкільної освіти.
                    </div>
                    <div className="video">
                        <iframe width="100%" height="378" style={{ borderRadius: '16px' }} src="https://www.youtube.com/embed/i3umBFqDznQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </section>
                <ClubCarousel clubs={clubs} />
                <section className="addit-information">
                    <div className="title-content ">
                        Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
                    </div>
                    <div className="content-text">
                        Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.
                    </div>
                    <div class="image">
                        <img src={`${process.env.PUBLIC_URL}/static/images/service/about_img.jpg`}></img>
                    </div>
                    <div className="title-content ">
                        Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
                    </div>
                    <div className="content-text">
                        Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.
                    </div>
                    <div className="title-content ">
                        Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
                    </div>
                    <div className="content-text">
                        Витяг. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet aliquam id diam maecenas.
                    </div>
                </section>
            </div>
        </Layout >
    )
}
export default AboutProject;