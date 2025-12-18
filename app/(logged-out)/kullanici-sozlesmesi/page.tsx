import KullaniciSozlesmesi from "@/components/policies/KullaniciSozlesmesi";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
    title: "Kullanıcı Sözleşmesi - Verinin Mutfağı",
    description: "Verinin Mutfağı kullanıcı sözleşmesi. Platform kullanım şartlarını inceleyin.",
};
const page = () => {
    return (
        <Wrapper>
            <KullaniciSozlesmesi />
        </Wrapper>
    )
}

export default page
