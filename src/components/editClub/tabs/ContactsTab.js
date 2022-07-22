import {Button, Form, Input, message, Select} from "antd";
import React, {useEffect, useState} from "react";
import EditClubContentFooter from "../EditClubContentFooter";
import EditClubInputAddress from "../EditClubInputAddress";
import MaskIcon from "../../MaskIcon";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import {getDistrictsByCityName} from "../../../service/DisctrictService";
import "../css/MainInformationTab.less"
import {deleteClubById, updateClubBuId} from "../../../service/ClubService";
import {getStationsByCity, getStationsByDistrictNameAndCityName} from "../../../service/StationService";

const {Option} = Select;

const ContactsTab = ({contacts, cities, setResult, result}) => {

    //TODO Add to UI ability to choose which location is being updated as club can possess several locations
    const FIRST_LOCATION = 0;//test mode work only with first location

    const [contacts_data, setContactsData] = useState({});
    const [contactsForm] = Form.useForm();
    const [cityName, setCityName] = useState(null);
    const [districtName, setDistrictName] = useState(null);
    const [cityOnInput, setCityOnInput] = useState(null);
    const [inputAddressProps, setInputAddressProps] = useState({});
    const [districts, setDistricts] = useState([]);
    const [stations, setStations] = useState([]);
    const [hideButton, setHideButton] = useState();

    const currentContacts = [];

    useEffect(() => {
        getDistrictsByCityName(cityName).then(response => setDistricts(response));
        getStationsByCity(cityName).then(response => setStations(response));
    }, [cityName]);

    const commitTab = (values) => {
        Object.assign(values, contactsForm.getFieldValue());

        let city = cities.find(e => e.name === values.cityName);
        if(city){
            result.locations[FIRST_LOCATION].locationCity = city;
            result.locations[FIRST_LOCATION].cityId = city.id;
            result.locations[FIRST_LOCATION].cityName = city.name;
        }

        let district = districts.find(e => e.name === values.districtName);
        if(district){
            result.locations[FIRST_LOCATION].districtId = district.id;
            result.locations[FIRST_LOCATION].districtName = district.name;
        }

        let station = stations.find(e => e.name === values.stationName);
        if(station){
            result.locations[FIRST_LOCATION].stationId = station.id;
            result.locations[FIRST_LOCATION].stationName = station.name;
        }

        if(values.address){
            result.locations[FIRST_LOCATION].address = values.address;
        }

        currentContacts[0].contactData = values.clubContactТелефон;
        currentContacts[1].contactData = values.clubContactFacebook;
        currentContacts[2].contactData = values.clubContactWhatsApp;
        currentContacts[3].contactData = values.clubContactПошта;
        currentContacts[4].contactData = values.clubContactSkype;
        currentContacts[5].contactData = values.clubContactSite;
        result.contacts = currentContacts;

        setHideButton({display:"none"});
    }

    const onFinish = (values) => {
        // if (inputAddressProps.validateStatus === 'error') {
        //     message.error("Некоректно вибрана адреса");
        //     return;
        // }

        // geocodeByAddress(values.address.label)
        //     .then(results => getLatLng(results[0]))
        //     .then(({lat, lng}) => {
        //         values.latitude = lat;
        //         values.longitude = lng;
        //
        //         setResult(Object.assign(result, values));
        //     });
        updateClubBuId(result).then(window.location.reload());
    };

    const handleSelect = address => {
        setInputAddressProps({validateStatus: 'success'});
        setCityOnInput(cityName);
    };

    function setCurrentContacts(contacts, result) {

        contacts.map(contact =>{
            let contactValue = "";
            result.contacts.map(currentContact =>{
                if(currentContact.contactType.name === contact.name){
                    contactValue = currentContact.contactData;
                    }
                })
            currentContacts.push({
                contactType : contact,
                contactData : contactValue
            });
            })
        return currentContacts;
    }

    return (
        <Form
            name="basic"
            form={contactsForm}
            requiredMark={false}
            onFinish={onFinish}>

            <div className="edit-club-inline">
                <Form.Item name="cityName"
                           className="edit-club-row"
                           label="Місто"
                           initialValue={result.locations.length ? result.locations[FIRST_LOCATION].cityName : ""}
                >
                    <Select
                        className="edit-club-select"
                        placeholder="Виберіть місто"
                        onChange={(value) => {
                            if (cityName) {
                                cityOnInput === value ?
                                    setInputAddressProps({validateStatus: 'success'}) :
                                    setInputAddressProps({validateStatus: 'error'});
                            }

                            setCityName(value);
                        }}
                        optionFilterProp="children">
                        {cities.map(city => <Option
                            value={city.name}>{city.name}</Option>)}

                    </Select>
                </Form.Item>
                <Form.Item name="districtName"
                           className="edit-club-row"
                           label="Район"
                           initialValue={result.locations.length ? result.locations[FIRST_LOCATION].districtName : ""}
                           >
                    <Select
                        className="edit-club-select"
                        placeholder="Виберіть район"
                        optionFilterProp="children">
                        {districts.map(district => <Option value={district.name}>{district.name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="stationName"
                           className="edit-club-row"
                           label="Станція/зупинка"
                           initialValue={result.locations.length ? result.locations[FIRST_LOCATION].stationName : ""}
                >
                    <Select
                        className="edit-club-select"
                        placeholder="Виберіть станцію"
                        optionFilterProp="children">
                        {stations.map(station => <Option value={station.name}>{station.name}</Option>)}
                    </Select>
                </Form.Item>
            </div>
            <Form.Item name="address"
                       className="edit-club-row"
                       label="Адреса"
                       initialValue={result.locations.length ? result.locations[FIRST_LOCATION].address : ""}
                       // validateTrigger={handleSelect}
                       // {...inputAddressProps}
            >
                <Input className="edit-club-input"
                       value={result.locations.length ? result.locations[FIRST_LOCATION].address : ""}
                       placeholder="Адреса"
                       defaultValue={result.locations.length ? result.locations[FIRST_LOCATION].address : ""}
                />
                {/*<EditClubInputAddress*/}
                {/*    placeholder={result.address}*/}
                {/*    form={contactsForm}*/}
                {/*    //inputText={result.address && result.address.label}*/}
                {/*    inputText={result.locations[FIRST_LOCATION].address}*/}
                {/*    setCityName={setCityName}*/}
                {/*    onChange={handleSelect}/>*/}
            </Form.Item>
            <Form.Item
                label="Контакти"
                className="edit-club-row edit-club-contacts">
                {setCurrentContacts(contacts, result).map(contact =>
                    <Form.Item name={`clubContact${contact.contactType.name}`}
                               //name={contact.name}
                               className="edit-club-contact"
                               initialValue={contact.contactData}
                               >
                        <Input className="edit-club-input"
                               placeholder="Заповніть поле"
                               suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contact.contactType.urlLogo}/>}/>
                    </Form.Item>)}
            </Form.Item>
            <div style={{height: 70}}>
                <Button htmlType="button" style={hideButton} onClick={commitTab} className="edit-club-tab-button">Зберегти зміни вікна</Button>
                <Button htmlType="submit" onClick={onFinish} className="edit-club-button">Зберегти гурток</Button>
            </div>
        </Form>
    )
};

export default ContactsTab;