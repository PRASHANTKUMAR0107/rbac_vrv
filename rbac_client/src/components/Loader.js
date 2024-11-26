import { FallingLines } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div>
        <FallingLines
            color="cyan"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
  />
    </div>
  )
}

export default Loader