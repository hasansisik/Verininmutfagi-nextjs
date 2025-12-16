import CerezPolitikasi from "@/components/policies/CerezPolitikasi";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
    title: "Çerez Politikası - Verinin Mutfağı",
};
const page = () => {
    return (
        <Wrapper>
            <CerezPolitikasi />
        </Wrapper>
    )
}

export default page
