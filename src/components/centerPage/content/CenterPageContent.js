import React from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import './css/PageContentСenter.css';
import {Button} from "antd";
import {convertToHtml} from "../../editor/EditorConverter";

const CenterPageContent = ({ center, loading }) => {

    return (
        <Content className="page-content">
            {/*<PageRatingCenter rating={center.rating} count={feedbackCount}/>*/}
            {!center ?
                <div className="content">У цього центру опису немає...</div>
                :
                loading ? <div className="empty-block"/> :
                    <div className="content" >
                        {center.description}
                    </div>}
        </Content>
    )
};

CenterPageContent.propTypes = {
  //center: PropTypes.object.isRequired
};

export default CenterPageContent;
