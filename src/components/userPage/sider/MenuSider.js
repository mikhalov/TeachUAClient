import React from 'react';
import '../sider/css/Sider.less'
import {MailOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import {Link} from "react-router-dom";


const MenuSiderComponent = ({url}) => {

    return (
        <div className="menu-component">

            <div className="menu-title">Особистий кабінет</div>

            <Menu className="sider-profile"
                  mode="inline"
                  defaultSelectedKeys={[`${url}/page`]}
                  onSelect={info => {}}
            >
                <Menu.Item className="menu-item"
                           style={{paddingLeft: 15}}
                           key={`${url}/page`}
                           icon={<UserOutlined className="icon-user" style={{fontSize: 20}} />}
                >
                    <Link to={`${url}/page`}>Профіль</Link>
                </Menu.Item>
                <Menu.Item className="menu-item"
                           style={{paddingLeft: 15}}
                           key={`${url}/messages`}
                           icon={<MailOutlined className="icon-message" style={{fontSize: 20}} />}
                >
                    <Link to={`${url}/messages`}>Повідомлення</Link>
                </Menu.Item>
            </Menu>
        </div>

        // Попередній варіант - кнопки були не робочими
        // <div className="menu-component">
        //     <div className="menu-title">Особистий кабінет</div>
        //     <div className="sider-profile">
        //         <div className="user-prof">
        //             <UserOutlined className="icon-user"/>Профіль
        //         </div>
        //         <div className="sider-message">
        //             <MailOutlined className="icon-message"/>Повідомлення
        //         </div>
        //     </div>
        // </div>
    );
};

export default MenuSiderComponent;
