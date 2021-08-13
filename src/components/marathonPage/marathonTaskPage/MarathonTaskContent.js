import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import {Button, Form} from "antd";
import marathonDay from "../marathonDayData/DataObjects";
import './../css/MarathonTaskPage.css'


const MarathonTaskContent = () => {

    const path = window.location.pathname.split("/")[window.location.pathname.split("/").length-1];
    const data = marathonDay.marathonDay.find(value => value.pathUrl === path);

    return (
        <Content className="marathon-task-page">
            <img className="task-image"
                 src={process.env.PUBLIC_URL + "/static/images/marathon/marathon-logo.png"}/>
            <div className="header-content">
            <div className="task-header">
                {data.name}
            </div>

            <div className="task-subheader">
                {data.subheader}
            </div>
            <div className="task-text ">
                {data.text}
            </div>
            </div>

            <div className="task-content">
            <div className="task-task-header">
                Завдання
            </div>

            <div className="task-info">
                {data.task}
            </div>

            </div>


            {/*<Form.Item>*/}
            {/*    <Button className="return-button"*/}
            {/*            htmlType="submit"*/}
            {/*            href={"/marathon"}>*/}
            {/*        До Мовомаратону*/}
            {/*    </Button>*/}
            {/*</Form.Item>*/}

            <div className="full-width button-box">
            </div>
        </Content>


    )
};

MarathonTaskContent.propTypes = {
    task: PropTypes.object.isRequired
};


export default MarathonTaskContent;