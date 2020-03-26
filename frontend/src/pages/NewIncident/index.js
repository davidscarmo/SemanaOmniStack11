import React, {useState} from 'react'; 
import {Link, useHistory} from 'react-router-dom'; 
import './styles.css'; 
import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'; 

export default function NewIncident()
{
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [value, setValue] = useState(''); 

    const ongId = localStorage.getItem('ongId'); 
    const history = useHistory();

    async function handleNewIncident(e)
    {
        e.preventDefault(); 

        const data = {
            title, 
            description, 
            value
        }; 

        try 
        {
         await api.post('incidents', data, {
             headers: 
             {
                 Authorization: ongId
             } 

         }); 
         history.push('/profile'); 
        }
         catch (err) 
        {
          alert ("Erro ao cadastrar caso, tente novamente."); 
        }
    }
    return(
        <div className="new-incident-container">
           <div className="content">
           <section>
                    <img src={logoImg} alt="Logo Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um héroi para resolver isso.
                    </p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para a home
                    </Link>
               </section>

               <form onSubmit={handleNewIncident}>
                   <input type="text" 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                   <textarea type="text" 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                   <input type="text" 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />
                   

                    <button className="button">Cancelar</button>
                   <button className="button">Cadastrar</button>
               </form>
    
           </div>
       </div>
    );
}
 