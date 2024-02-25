import homepage from "../assets/pic2 3.jpg";
import SearchIcon from "../assets/search.svg"

export default function Search() {
    return (
        <div style={{ marginTop: '-40px', display: 'flex' }} className="">
            <img src={homepage} className="img-fluid img-thumbnail" 
                style={{
                    width: '100%', 
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.3)', 
                    filter: 'contrast(110%)' 
                }} 
                alt="Homepage"
            />
            <form className="d-flex" style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-82%, 112%)',
                // backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                padding: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                width: 'calc(100% - 20px)', // Adjusted width for smaller screens
                // maxWidth: '1024px',
                maxWidth: '600px',
                margin: 'auto' // Center the form horizontally
            }}>
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search by address or neighbourhood" 
                    aria-label="Search by address or neighbourhood" 
                    style={{ 
                        backgroundImage: `url(${SearchIcon})`, 
                        backgroundPosition: '10px center', 
                        backgroundRepeat: 'no-repeat', 
                        borderRadius: '30px',
                        paddingLeft: '40px',
                    }} 
                />
                <button className="btn btn-primary" type="submit"
                    style ={{
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        marginLeft : '-85px',
                        borderTopRightRadius: '30px',
                        borderBottomRightRadius: '30px'
                    }} >
                    Search</button>
            </form>
        </div>
    )
}