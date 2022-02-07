
const Alert = ({error}) => {
    return (

        <div className="alert alert-danger mt-3" role="alert">
            {error}
        </div>

    )
}

export default Alert;