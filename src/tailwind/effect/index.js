import { Transition } from '@headlessui/react'

export const SlideInLeftAndRight = ({ children, state = true }) => {
    return (
        <Transition
            show={state}
            enter="transition ease duration-700 transform"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease duration-1000 transform"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full">
            <>
                {children}
            </>
        </Transition>

    )
}

export const FullWidth = ({ children, state = true }) => {
    return (
        <Transition
            show={state}
            enter="transition ease duration-700 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease duration-1000 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full">
            <>
                {children}
            </>
        </Transition>

    )
}