import { FC, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Action, Contact } from '../reducer/contactsReducer';

interface ContactFormProps {
    dispatch: React.Dispatch<Action>;
    dataToEdit: Contact | undefined;
    toggleModal: () => void;
}

const ContactForm: FC<ContactFormProps> = ({ dispatch, dataToEdit, toggleModal }) => {

    const [contact, setContact] = useState({
        firstName: dataToEdit?.firstName ? dataToEdit.firstName : '',
        lastName: dataToEdit?.lastName ? dataToEdit.lastName : '',
        phone: dataToEdit?.phone ? dataToEdit.phone : ''
    })

    const [errorMsg, setErrorMsg] = useState('')

    // console.log(contact.firstName)

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setContact((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleObSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { firstName, lastName, phone } = contact; 

        if (firstName.trim() === '' || lastName.trim() === '' || phone.trim() === '') {
            setErrorMsg("กรุณาป้อนข้อมูลให้ครบทุกช่อง!!");
            return;
        } else if (!phone.trim().match(/^\d{10}$/g)) {
            setErrorMsg("กรุณาใส่หมายเลขโทรศัพท์ 10 หลักให้ถูกต้อง!!");
            return;
        }

        if (!dataToEdit) {
            dispatch({
                type: "ADD_CONTACT",
                payload: {
                    id: Date.now(),
                    ...contact
                }
            })
            setContact({
                firstName: '',
                lastName: '',
                phone: ''
            })
        } else {
            dispatch({
                type: "UPDATE_CONTACT",
                payload: {
                    id: dataToEdit.id,
                    updates: {
                        id: Date.now(),
                        ...contact
                    }
                }
            })
            toggleModal();
        }
    }

    return (
        <Form className='contact-form' onSubmit={handleObSubmit}>
            {errorMsg && <p className='alert alert-danger'>{errorMsg}</p>}
            <Form.Group controlId='firstName'>
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                    className='firstName'
                    name='firstName'
                    value={contact.firstName}
                    type='text'
                    onChange={handleOnChange}
                />
            </Form.Group>

            <Form.Group controlId='lastName'>
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                    className='lastName'
                    name='lastName'
                    value={contact.lastName}
                    type='text'
                    onChange={handleOnChange}
                />
            </Form.Group>

            <Form.Group controlId='phone'>
                <Form.Label>เบอร์โทร</Form.Label>
                <Form.Control
                    className='phone'
                    name='phone'
                    value={contact.phone}
                    type='number'
                    onChange={handleOnChange}
                />
            </Form.Group>

            <Form.Group controlId='submit' className='mt-4'>
                <Button variant='primary' type='submit' className='submit'>
                    {dataToEdit ? 'อัปเดตผู้ติดต่อ' : 'เพิ่มผู้ติดต่อ'}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default ContactForm