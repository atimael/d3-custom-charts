import { useEffect, useRef, useState } from 'react'

type UseResponsiveChartSettings = {
    height?: number
    width?: number
    marginTop?: number
    marginRight?: number
    marginBottom?: number
    marginLeft?: number
}

export const callAccessor = (accessor: any, d: any, i: any) => {
    if (typeof accessor === 'function') {
        return accessor(d, i)
    }
    return accessor
}

export const combineChartDimensions = (
    dimensions: UseResponsiveChartSettings
) => {
    let parsedDimensions = {
        ...dimensions,
        marginTop: dimensions.marginTop || 10,
        marginRight: dimensions.marginRight || 10,
        marginBottom: dimensions.marginBottom || 40,
        marginLeft: dimensions.marginLeft || 75,
        width: dimensions.width || 0,
        height: dimensions.height || 0,
    }

    return {
        ...parsedDimensions,
        boundedHeight: Math.max(
            parsedDimensions.height -
                parsedDimensions.marginTop -
                parsedDimensions.marginBottom,
            0
        ),
        boundedWidth: Math.max(
            parsedDimensions.width -
                parsedDimensions.marginLeft -
                parsedDimensions.marginRight,
            0
        ),
    }
}

export const useResponsiveChart = (
    settings: UseResponsiveChartSettings = {}
) => {
    const ref = useRef(null)

    const dimensions = combineChartDimensions(settings)

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        // if the width and height passed then we don't attach the resize observer
        if (dimensions.width && dimensions.height) return

        const refEl = ref.current

        if (!refEl) return

        const resizeObserver = new ResizeObserver((entries) => {
            if (!Array.isArray(entries) || !entries.length) return

            const entry = entries[0]

            if (width !== entry.contentRect.width) {
                setWidth(entry.contentRect.width)
            }

            if (height !== entry.contentRect.height) {
                setHeight(entry.contentRect.height)
            }
        })

        resizeObserver.observe(refEl)

        return () => resizeObserver.unobserve(refEl)
    }, [settings, height, width, dimensions])

    const changedSettings = combineChartDimensions({
        ...dimensions,
        width: settings.width || width,
        height: settings.height || height,
    })

    return { ref, dimensions: changedSettings }
}
