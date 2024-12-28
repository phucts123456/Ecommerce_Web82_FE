import { Card } from "antd"
const { Meta } = Card;
function ProductShop({shopId, shopName, shopAddress}) {
    return (
        <>
        <a style={{textDecoration:'none'}} href={`/product_list?sid=${shopId}`}>
            <Card 
                hoverable                       
                style={{ display: 'flex',width: "50%" , marginBottom:'20px'}}
            >
                <div style={{display: 'flex', flexDirection:'column',width:"100%"}}>
                    <Meta style={{ width: "100%" }} title={<p><img src='/img/shop.svg' alt='shop' />{`${shopName}`}</p>} description={`Address: ${shopAddress}`} />
                </div>
            </Card>
        </a>
        </>
        
    )
}

export default ProductShop