import React, {useEffect, useState} from "react";
import Layout from "antd/lib/layout/layout";
import "./css/serviceInUkr.css";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import {Button, Collapse} from "antd";
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import {getAllQuestions} from "../../service/QuestionService";

const ServiceInUkr = () => {
    const {Panel} = Collapse;
    const [questions, setQuestions] = useState([]);

    const getData = () => {
        getAllQuestions().then(response => setQuestions(response))
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout className="serviceInUkr global-padding">
            <div className="title"
                 style={{background: `url(${process.env.PUBLIC_URL}/static/images/service/ukr_service.png) center / cover`}}>
                <span className="text">Послуги українською</span>
            </div>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Ми у соц. мережах</span>
                    <div className="links">
                        <a target="_blank" href="#"><TwitterOutlined className="icon"/></a>
                        <a target="_blank" href="#"><FacebookOutlined className="icon"/></a>
                        <a target="_blank" href="#"><GoogleOutlined className="icon"/></a>
                        <a target="_blank" href="#"><InstagramOutlined className="icon"/></a>
                    </div>
                </div>
                <div className="help-button">
                    <a target="blank" href="#"><Button className="flooded-button donate-button">Допомогти
                        проекту</Button> </a>
                </div>
            </div>
            <div className="content">
                <div className="content-title">
                    Освітні послуги українською мовою у закладах позашкільної освіти
                </div>
                <div className="content-text">
                    Із 16 січня 2021 набуває чинності стаття 30 закону “Про забезпечення функціонування української мови
                    як державної” про державну мову у сфері обслуговування споживачів. З 16 січня всі надавачі послуг,
                    незалежно від форми власності, зобов’язані обслуговувати споживачів і надавати інформацію про товари
                    і послуги державною мовою. Громадяни мають право отримати освітній послуги українською мовою у
                    закладах позашкільної освіти.
                </div>
            </div>
            <div className="faq">
                <div className="faq-title">Популярні Питання (FAQ)</div>
                {questions.map(question =>
                    <Collapse class="collapse"
                              defaultActiveKey={['1']}
                              expandIconPosition="right"
                              expandIcon={({isActive}) => <CaretRightOutlined style={{color: '#2E69C9'}}
                                                                              rotate={isActive ? 90 : 0}/>}
                    >
                        <Panel className="panel"
                               header={question.title} key={question.id}>
                            <p>{question.text}</p>
                        </Panel>
                    </Collapse>
                )}
            </div>
        </Layout>
    )
}
export default ServiceInUkr;