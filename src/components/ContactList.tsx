import { FC } from 'react'
import { Contact, Action } from '../reducer/contactsReducer'
import ContactItem from './ContactItem';

interface ContactListProps {
    contacts: Contact[];
    handleEdit: (id: number) => void;
    dispatch: React.Dispatch<Action>;
}

const ContactList: FC<ContactListProps> = ({ contacts, handleEdit, dispatch }) => {
    return (
        <div className='contacts-list'>
            <h3 className='contacts-list-title'>รายชื่อผู้ติดต่อ</h3>
            <div className="contacts-list-table-container">
                <table className="contacts-list-table">
                    <thead className="contacts-list-header">
                        <tr>
                            <th>ชื่อ</th>
                            <th>นามสกุล</th>
                            <th>เบอร์โทร</th>
                            <th>แก้ไข</th>
                            <th>ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((props) => (
                            <ContactItem key={props.id} {...props} handleEdit={handleEdit} dispatch={dispatch}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ContactList