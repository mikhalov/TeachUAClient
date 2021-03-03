import React, {useMemo, useState} from "react";
import './App.less';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./components/header/HeaderComponent";
import ClubListComponent from "./components/clubList/ClubListComponent";
import FooterComponent from "./components/footer/FooterComponent";
import {SearchContext} from "./context/SearchContext";
import ClubPage from "./components/clubPage/ClubPage";
import MainComponent from "./components/main/MainComponent";
import UserPage from "./components/userPage/UserPage";
import EditorComponent from "./components/editor/EditorComponent";

const {Sider, Content} = Layout;

function App() {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });


    const clubProvider = useMemo(() => ({clubs, setClubs}), [clubs, setClubs]);

    return (
        <Layout className="layout">
            <div className="behind-header"/>
            <Router basename={process.env.PUBLIC_URL}>
                <SearchContext.Provider value={clubProvider}>
                    <HeaderComponent/>
                    <Layout>
                        {false && (<Sider>Sider</Sider>)}
                        <Content className="global-content">
                            <Switch>
                                <Route path="/test" exact component={EditorComponent}/>
                                <Route path="/club/:id" exact component={ClubPage}/>
                                <Route path="/clubs" exact component={ClubListComponent}/>
                                <Route path="/user/:id" exact component={UserPage}/>
                                <Route path="/" component={MainComponent}/>
                            </Switch>
                        </Content>
                    </Layout>
                </SearchContext.Provider>
                <FooterComponent/>
            </Router>
        </Layout>
    );
}

export default App;
