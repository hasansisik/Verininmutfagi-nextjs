import GizlilikPolitikasi from "@/components/policies/GizlilikPolitikasi";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
    title: "Gizlilik Politikası - Verinin Mutfağı",
};
const page = () => {
    return (
        <Wrapper>
            <GizlilikPolitikasi />
        </Wrapper>
    )
}

export default page
