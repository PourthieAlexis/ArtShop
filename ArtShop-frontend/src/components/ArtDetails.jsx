import styled from 'styled-components';
import Comment from './Comment';
import Dropdown from './Dropdown';

const ArtDetails = () => {
    return (
        <PageContainer>
            <DetailsContainer>
                <ImageContainer>
                    <Image src="https://placehold.co/600x400" alt="placeholder" />
                    <Dropdown />
                </ImageContainer>
                <DetailsContent>
                    <Title>
                        <h1>Product Name</h1>
                        <Price>55€</Price>
                    </Title>
                    <RateStar>⭐⭐⭐⭐⭐</RateStar>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eligendi quaerat dolorum illum provident aliquam officiis architecto
                        laudantium quo et deserunt velit sapiente cum nesciunt, laborum culpa dolorem fuga, consequatur officia.
                    </p>
                    <label htmlFor="quantity">
                        Quantité
                    </label>
                    <InputQuantity type="number" defaultValue={1} />
                    <InputSubmit type="submit" value="Ajouter au panier" />

                    <Details>
                        <TitleDetails>
                            Détails
                        </TitleDetails>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Sit in incidunt ipsum non fuga nobis numquam dicta accusamus quo laborum, deserunt quaerat,
                            soluta nulla suscipit eaque obcaecati ipsa? Labore, corporis.
                        </p>
                    </Details>
                </DetailsContent>
            </DetailsContainer >
            <CommentContainer>
                <Comment />
                <Comment />
                <Comment />
                <InputComment type='text' />
                <InputCommentSubmit type='submit' />
            </CommentContainer>
        </PageContainer>
    )
}

const PageContainer = styled.section`
    padding: 4rem;
    min-height: 100vh;
    height: 100%;
`



const ImageContainer = styled.div`
    position: relative;
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    gap: 1rem;
`

const Image = styled.img`
    width: 100%;
`


const DetailsContainer = styled.div`
    display: flex;
    gap: 2rem;
`

const Title = styled.div`
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        margin: 0;
        font-size: 2rem;
    }
`

const Price = styled.div`
    font-weight: 700;
    font-size: 2rem;
`

const RateStar = styled.div`
`

const InputQuantity = styled.input`
    width: 4rem;
    height: 2rem;
`

const InputSubmit = styled.input`
    background-color: #000000;
    color: white;
    height: 3rem;
    cursor: pointer;
`

const DetailsContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 1rem;
`

const Details = styled.div`
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 1rem;
`

const TitleDetails = styled.p`
    font-weight: 700;
    font-size: 1rem;
`

const InputComment = styled.input`
    padding:1rem;
    width: 80%;
`

const InputCommentSubmit = styled.input`
    margin-left: -4rem;
    width: 4rem;
    height: 3rem;
 `


const CommentContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 2rem;
    gap: 1rem;
`

export default ArtDetails