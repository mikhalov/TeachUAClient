import React, {useEffect, useRef, useState} from 'react';
import {getUserId} from "../../../service/StorageService";
import ModalHint from "./ModalHint";
import '../../clubPage/sider/css/PageSider.css';
import classes from "./css/SignUpForClub.module.css";
import TextArea from "antd/lib/input/TextArea";
import {Button, Form, Modal} from "antd";
import {createMessage} from "../../../service/MessageService";
import {getUsersByRole} from "../../../service/UserService";
import ContactsInfoUtil from "../../../util/ContactsInfoUtil";

const SignUpForClub = ({isShowing, setShowing, club}) => {

    const [messageForm] = Form.useForm();
    const [admin, setAdmin] = useState({id: 1});

    const getRecipientId = () => {
        if (club.user) {
            return club.user.id;
        } else if (club.center && club.center.user) {
            return club.center.user.id;
        } else {
            return admin.id;
        }
    }

    const onFinish = (values) => {
        const data = {
            senderId: getUserId(),
            clubId: club.id,
            recipientId: getRecipientId(),
            text: values.text,
        };
        setShowing(false);
        createMessage(data).then(() => messageForm.resetFields())
    };

    return (
        !getUserId()
            ?
            <ModalHint visible={isShowing}
                       setVisible={setShowing}
            >
                Увійдіть або зареєструйтеся!!!
            </ModalHint>
            :
            <Modal
                className={classes.signUpForClubModal}
                centered
                width={521}
                visible={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
                footer={null}
            >
                <div className={classes.title}>
                    Записатись на гурток
                </div>

                <div className={classes.content}>

                    <div className={classes.clubName}>
                        {club.name}
                    </div>

                    <div className={classes.comment}>
                        Для запису на гурток зконтактуйте з відповідальними особами
                    </div>

                    <div className={classes.contacts}>
                        <ContactsInfoUtil className={classes.contacts} contacts={club.contacts}/>
                    </div>

                    <hr className={classes.hr}/>

                    <Form
                        className={classes.form}
                        name="message-from-club"
                        form={messageForm}
                        requiredMark={true}
                        onFinish={onFinish}
                    >
                        <div className={classes.formItem}>
                            <Form.Item
                                label="Написати організатору гуртка"
                                labelCol={{className: classes.labelBlock}}
                                name="text"
                                rules={[{
                                    required: true,
                                    message: "Додайте текст повідомлення"
                                }]}
                            >
                            </Form.Item>
                            <TextArea className={classes.textArea}
                                      autoSize={{minRows: 5, maxRows: 5}}
                                      placeholder="Додайте опис"
                            />
                        </div>

                        <div className={classes.formItem}>
                            <Button
                                className={classes.formButton}
                                type="primary"
                                htmlType="submit"
                            >
                                Надіслати
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
    );
};

export default SignUpForClub;
