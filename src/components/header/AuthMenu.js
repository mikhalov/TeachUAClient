import React, {useEffect, useState, useContext} from "react";
import {Avatar, Dropdown, Menu, message} from "antd";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Registration from "../registration/Registration";
import '../registration/сss/Registration.less'
import {Link, useHistory} from "react-router-dom";
import AddClubModal from "../addClub/AddClubModal";
import Login from "../login/Login";
import './css/authMenu.css';
import {getToken, getUserId, deleteUserStorage} from "../../service/StorageService";
import {BASE_URL, DOWNLOAD_DATABASE_SQL} from "../../service/config/ApiConfig";
import {getUserById} from "../../service/UserService";
import AddCenter from "../addCenter/AddCenter";
import {updateRating} from "../../service/RatingService";
import {AuthContext} from "../../context/AuthContext";

const {SubMenu} = Menu;

const AuthMenu = () => {
    const history = useHistory(); 

    const [showAddClub, setShowAddClub] = useState(false);
    const [showAddCenter, setShowAddCenter] = useState(false);

    const {showLogin, setShowLogin} = useContext(AuthContext);
    const [showRegister, setShowRegister] = useState(false);

    const [user, setUser] = useState('');
    const [source, setSource] = useState('');
    const [styleClass, setStyleClass] = useState('');
    const [isLogin, setIsLogin] = useState(null);

    const onExitClick = () => {
        deleteUserStorage();
        setIsLogin(false);
        history.push("/");
    };

    useEffect(() => {
        if (getUserId()) {
            getUserById(getUserId()).then(response => {
                setUser(response);
                if (response) {
                    if (response.urlLogo?.includes("https")) {
                        setSource(response.urlLogo);
                    } else {
                        setSource(BASE_URL + response.urlLogo)
                    }
                    setStyleClass("avatarIfLogin");
                    return;
                }
            })
        }
        setSource('');
        setStyleClass("avatarIfNotLogin");
    }, [isLogin])

    const checkToken = () => {
        if (getToken()) {
            const token = getToken();
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiration = new Date(payload.exp);
            const now = new Date();
            if (expiration.getTime() - now.getTime() / 1000 < 0) {
                onExitClick();
                return false;
            } else {
                return true;
            }
        }
    }
    const [isTokenValid, setIsTokenValid] = useState(checkToken);


    useEffect(() => {
        setIsTokenValid(checkToken());
    })

    const profileDropdown = () => {

        if (isTokenValid) {
            return (
                <Menu>
                    <Menu.Item key="add_club"><div onClick={() => setShowAddClub(true)}>Додати гурток</div></Menu.Item>
                    <Menu.Item key="add_centre"><div onClick={() => setShowAddCenter(true)}>Додати центр</div></Menu.Item>
                    <Menu.Item key="search_certificates"><Link to="/certificate">Пошук сертифікатів</Link></Menu.Item>

                    { (user && user.roleName === "ROLE_ADMIN") &&
                    <>
                        <SubMenu title="Контент" key="content">
                            {/* For some reason challenges pop up to the right. Added an offset to fix that */}
                            <SubMenu title="Челенджі" key="challenges-submenu" popupOffset={[-215, 0]}>
                                <Menu.Item key="tasks"><Link to="/admin/tasks">Завдання</Link></Menu.Item>
                                <Menu.Item key="challenges"><Link to="/admin/challenges">Челенджі</Link></Menu.Item>
                            </SubMenu>

                            <SubMenu title="Сертифікати" key="certificates">
                                <Menu.Item key="all_certificates"><Link to="/admin/certificates">Всі сертифікати</Link></Menu.Item>
                                <Menu.Item key="all_templates"><Link to="/admin/templates">Всі шаблони</Link></Menu.Item>
                                <Menu.Item key="generate_certificates"><Link to="/admin/certificate/generate">Згенерувати сертифікати</Link></Menu.Item>
                                <Menu.Item key="generate_certificate_by_template"><Link to="/admin/certificate-by-template/generate">Згенерувати сертифікати за шаблоном</Link></Menu.Item>
                            </SubMenu>

                            <SubMenu title="Тести" key="quiz-submenu">
                                <Menu.Item key="questions"><Link to="/admin/quiz/questions">Всі запитання</Link></Menu.Item>
                                <Menu.Item key="import_questions"><Link to="/admin/questions-import"> Імпортувати запитання</Link></Menu.Item>
                                <Menu.Item key="generate_questions"><Link to="/admin/questions/generate">Згенерувати запитання</Link></Menu.Item>
                            </SubMenu>

                            <Menu.Item key="logs"><Link to="/logs">Логи</Link></Menu.Item>
                            <SubMenu title="Файли" key="files">
                                <Menu.Item key="all_files"><Link to="/admin/files">Всі файли</Link></Menu.Item>
                                <Menu.Item key="unused_files"><Link to="/admin/unused-files">Невикористані файли</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="users"><Link to="/admin/users">Користувачі</Link></Menu.Item>
                        </SubMenu>

                        <SubMenu title="Локаціі" key="locations">
                            <Menu.Item key="cities"><Link to="/admin/cities">Міста</Link></Menu.Item>
                            <Menu.Item key="districts"><Link to="/admin/districts">Райони</Link></Menu.Item>
                            <Menu.Item key="stations"><Link to="/admin/stations">Станції/Місцевості</Link></Menu.Item>
                        </SubMenu>

                        <SubMenu title="Гуртки" key="clubs">
                            <Menu.Item key="categories"><Link to="/admin/categories">Категорії</Link></Menu.Item>
                            <Menu.Item key="fix_club_categories"><Link to="/admin/fix-clubs-categories">Клуби без Категорій</Link></Menu.Item>
                            <Menu.Item key="club_approve"><Link to="/admin/club-approve">Підтвердження</Link></Menu.Item>
                            <Menu.Item key="change_club_owner"><Link to="/admin/change-club-owner">Зміна власника</Link></Menu.Item>
                            <Menu.Item key="update_rating" onClick={() => {updateRating().then();}}>Перерахувати рейтинги</Menu.Item>
                            <Menu.Item key="import_database"><Link to="/admin/import-database">Імпортувати дані</Link></Menu.Item>
                            <Menu.Item key="export_database"><Link target="_blank" to={{ pathname: DOWNLOAD_DATABASE_SQL }} download>Експортувати дані</Link></Menu.Item>
                        </SubMenu>

                        <SubMenu title="Сторінка" key="website">
                            <Menu.Item key="banners"><Link to="/admin/banners">Банер</Link></Menu.Item>
                            <Menu.Item key="news"><Link to="/admin/news">Новини</Link></Menu.Item>
                            <Menu.Item key="about"><Link to="/admin/about">Про нас</Link></Menu.Item>
                            <Menu.Item key="contact_types"><Link to="/admin/contact-types">Контакти</Link></Menu.Item>
                            <Menu.Item key="faq"><Link to="/admin/questions">FAQ</Link></Menu.Item>
                        </SubMenu>
                    </>
                    }

                    <Menu.Item key="profile"><Link to={`/user/${localStorage.getItem('id')}/page`}>Мій Профіль</Link></Menu.Item>
                    <Menu.Item key="logout" onClick={onExitClick} danger>Вийти</Menu.Item>
                </Menu>
            );
        } else {
            return (
                <Menu>
                    <Menu.Item key="register"><div onClick={() => setShowRegister(true)}>Зареєструватися</div></Menu.Item>
                    <Menu.Item key="login"><div onClick={() => setShowLogin(true)}>Увійти</div></Menu.Item>
                </Menu>
            )
        }
        
    };

    return (
        <>
            <Registration isShowing={showRegister} setShowing={setShowRegister} />
            <Login isShowing={showLogin} setShowing={setShowLogin} setIsLogin={setIsLogin} />
            {showAddClub &&
                <AddClubModal isShowing={showAddClub} setShowing={setShowAddClub} />
            }
            {showAddCenter &&
                <AddCenter isShowing={showAddCenter} setShowing={setShowAddCenter} />
            }
            <Dropdown overlay={profileDropdown} className="user-profile" placement="bottomCenter" arrow trigger={'click'}>
                <div>
                    <Avatar size="large" className={styleClass} src={source} icon={<UserOutlined />} /> <CaretDownFilled />
                </div>
            </Dropdown>
        </>
    )
};

export default AuthMenu;