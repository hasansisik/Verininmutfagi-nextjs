import GizlilikPolitikasi from "@/components/policies/GizlilikPolitikasi";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
    title: "Gizlilik Politikası - Verinin Mutfağı",
    description: "Verinin Mutfağı gizlilik politikası. Kişisel verilerinizin nasıl korunduğunu öğrenin.",
};
const page = () => {
    return (
        <Wrapper>
            <GizlilikPolitikasi />
        </Wrapper>
    )
}

export default page
