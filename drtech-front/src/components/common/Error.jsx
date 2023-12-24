const Error = (e) => {
    return (
      <div className="alert alert-danger" role="alert">
          {e.mensaje || 'Error'}
      </div>
    )
  }
  
  export default Error