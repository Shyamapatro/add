import { Button } from "../../tailwind";

const TestModal = ({
    title = '',
    content = '',
    children,
    show = false,
}) => {
    return (
        <>
            {
                show && <>
                    {children}
                    <div>
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">{title}</h3>
                        <p className="mt-2">{content}</p>
                        <div className="flex gap-5 mt-5 w-full">
                            <span className="w-full">
                                <Button
                                    title={'Yes'}
                                    borderRadius={'rounded-full'}
                                    backgroundColor={'bg-red-800'}
                                    hoverBackgroundColor={'hover:bg-red-900'}
                                />
                            </span>
                            <span className="w-full">
                                <Button
                                    title={'Cancel'}
                                    borderRadius={'rounded-full'}
                                />
                            </span>
                        </div>
                    </div>
                </>
            }

        </>
    )
}

export default TestModal;