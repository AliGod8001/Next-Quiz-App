import { useRouter, usePathname } from 'next/navigation';
import { Result } from 'antd';

import MainButton from '../button/MainButton';

const Error = ({
    reset,
} : {
    reset: () => void,
}) => {
    const router = useRouter()
    const path = usePathname()
    const backAction = path.split("/")[1]

    const backClickHandler = () => {
        router.push(`/${backAction}`)
    }

    return (
        <Result
            status="error"
            title="An error has occurred"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
            <MainButton key="console" onClick={reset}>
                Try Again
            </MainButton>,
            <MainButton variant="primary-outline" key="buutton" onClick={backClickHandler}>Back To {backAction}</MainButton>,
            ]}
        >
        </Result>
    )
}

export default Error;