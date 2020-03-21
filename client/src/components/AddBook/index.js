import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { ADD_BOOK, GET_BOOKS } from '../../queries'
import './styles.scss'

const AddBook = ({history}) => {
    const [addBook, {loading: addBookLoading}] = useMutation(ADD_BOOK)
    
    const  [state, setState] = useState({
        name: "",
        author: "",
        comment: "",
        recommendedBy: ""
    })

    // Random book size
    const randomHeight = () => Math.floor(Math.random() * (95 - 80)) + 80 + '%'; 
    const randomWidth = () => Math.floor(Math.random() * (3.75- 1.75)) + 1.75 + "em"; 


    const handleSubmit = (e) => {
        const addBookSize = () => ({
            width: randomWidth(),
            height: randomHeight(),
        })

        
        const bookSize = addBookSize()

        e.preventDefault()
        addBook({
            variables: {
                author: state.author,
                name: state.name, 
                comment: state.comment,
                recommendedBy: state.recommendedBy,
                moderated: false,
                published: false,
                width: bookSize.width,
                height: bookSize.height
            },
            refetchQueries:[{query:GET_BOOKS}]
        }) 
        .then(bookSubmitted => {
            console.log(bookSubmitted)
            const {id} = bookSubmitted.data.addBook
            history.push(`/gracias/${id}`)
        })
    }

    return (
        <div className="add-book container page">
            <form id="add-book" className="content" onSubmit={(e) => handleSubmit(e)}>
                <div className="field">
                    <label>Tu nombre:</label>
                    <input type="text" onChange={(e) => setState({...state, recommendedBy:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Título del libro:</label>
                    <input type="text" onChange={(e) => setState({...state, name:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Autor:</label>
                    <input type="text" onChange={(e) => setState({...state, author:e.target.value})}/>
                </div>

                <div className="field">
                    <label>¿Por qué lo recomiendas?</label>
                    <textarea onChange={(e) => setState({...state, comment:e.target.value})}/>
                </div>

                <div class="buttons">
                <button class="btn-line-black">Cancelar</button>
                <button class="btn-black">Añadir libro</button>
                </div>
            </form>
        </div>
    )
}

export default AddBook;