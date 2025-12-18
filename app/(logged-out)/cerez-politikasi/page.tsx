import CerezPolitikasi from "@/components/policies/CerezPolitikasi";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
    title: "Çerez Politikası - Verinin Mutfağı",
    description: "Verinin Mutfağı çerez politikası. Web sitemizde kullanılan çerezler hakkında bilgi edinin.",
};
const page = () => {
    return (
        <Wrapper>
            <CerezPolitikasi />
        </Wrapper>
    )
}

export default page
