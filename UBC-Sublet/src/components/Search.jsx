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
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                padding: '10px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                width: 'calc(100% - 900px)', 
                marginTop: '150px',
                marginLeft: '-200px',
                maxWidth: '1024px' 
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
                        paddingLeft: '40px',
                    }} 
                />
                <button className="btn btn-primary" type="submit">Search</button>
            </form>
        </div>
    )
}