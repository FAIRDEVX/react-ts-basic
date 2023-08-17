import { FC } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Contact, Action } from '../reducer/contactsReducer'

interface ExtraProps {
    handleEdit: (id: number) => void;
    dispatch: React.Dispatch<Action>;
}

const ContactItem: FC<Contact & ExtraProps> = ({ id, firstName, lastName, phone, handleEdit, dispatch}) => {
  return (
    <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{phone}</td>
        <td><AiFillEdit size={18} className='icon' onClick={() => handleEdit(id)}/></td>
        <td><AiFillDelete size={18} className='icon' onClick={() => {
            const confirmDelete = window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลของผู้ใช้ ${firstName} ${lastName}?`)
            if (confirmDelete) {
                // Dispatch Action
                dispatch({
                    type: "DELETE_CONTACT",
                    payload: {id}
                })
            }
        }}/></td>
        
    </tr>
  )
}

export default ContactItem