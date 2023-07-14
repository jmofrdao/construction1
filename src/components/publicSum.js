

const PublicSum = ({guestCart}) => {

    const cartSum = guestCart.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0);
    
    return (
        <div>
<p>Total: ${cartSum}</p>
        </div>
    )
}

export default PublicSum