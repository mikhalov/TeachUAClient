import {Button, Card, Rate} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Tags from "../Tags";
import CategoryLogo from "../CategoryLogo";
import {getShortContent} from "../editor/EditorConverter";


const ClubListItem = ({club, onClubClick}) => {
    return (
        <div>
            <Card className="card" onClick={() => onClubClick(club)}>
                <div className="title">
                    <CategoryLogo category={club.categories[0]}/>
                    <div className="name">{club.name}</div>
                </div>
                <div className="club-tags-box">
                    <Tags className="club-tags"
                          categories={club.categories.filter((_, idx) => idx < 3)}/>
                    <span>{club.categories.length > 3 && `і ще ${club.categories.length - 3}...`}</span>
                </div>
                {club.center !== null ?
                    <div className="with-center">
                        <div className="center">
                            <img className="center-logo" src={club.center.urlLogo} alt="Center logo"/>
                            <div className="center-description">
                                <span className="center-label">Центр розвитку</span>
                                <span className="center-name">{club.center.name}</span>
                            </div>
                        </div>
                        <div className="description">{getShortContent(club.description)}</div>
                    </div> :
                    <p className="description">{getShortContent(club.description)}</p>}
                <Rate className="rating" disabled value={club.rating}/>
                <div className="address">
                    <EnvironmentFilled
                        className="address-icon"/>
                    <span className="text"> {club.address}</span>
                </div>
                <Button className="outlined-button details-button">
                    <Link to={`/club/${club.id}`}>Детальніше</Link>
                </Button>
            </Card>
        </div>
    )
};
ClubListItem.propTypes = {
    club: PropTypes.object.isRequired
};


export default ClubListItem;