import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import notFound from '../images/NotFound.png'

const NotFound = () => {
    const element = <FontAwesomeIcon icon={faSearch} />
    return(
  <div className="not-found-container">
    <div className='top-notFound'>
        <img src={notFound} className='not-found-img'/>
        <h1 className='not-found-heading'>4<span className='search-icon-notFound'>{element}</span>4</h1>
    </div>
    <div className='bottom-notFound'>
        <h1 className='page-not-found'>Page Not Found</h1>
    </div>
  </div>
)}

export default NotFound