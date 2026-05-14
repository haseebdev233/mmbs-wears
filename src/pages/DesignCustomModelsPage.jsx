import { useMemo, useState } from 'react'

const fieldConfig = [
  ['height', 'Height (cm)', 170],
  ['weight', 'Weight (kg)', 70],
  ['chest', 'Chest (cm)', 96],
  ['waist', 'Waist (cm)', 80],
  ['shoulder', 'Shoulder (cm)', 44],
]

function DesignCustomModelsPage() {
  const [measurements, setMeasurements] = useState({
    height: 170,
    weight: 70,
    chest: 96,
    waist: 80,
    shoulder: 44,
  })

  const recommendation = useMemo(() => {
    const score = (measurements.chest + measurements.waist + measurements.shoulder) / 3
    if (score < 88) return 'S'
    if (score < 98) return 'M'
    if (score < 108) return 'L'
    return 'XL / Custom Stitch'
  }, [measurements])

  const updateMeasurement = (field, value) => {
    setMeasurements((current) => ({ ...current, [field]: Number(value) }))
  }

  return (
    <main className="container py-4 py-lg-5">
      <section className="mb-4">
        <div className="text-uppercase small text-info fw-semibold mb-2 letter-space">Design Lab</div>
        <h1 className="display-6 fw-bold text-white mb-2">Custom Models</h1>
        <p className="text-white-75 mb-0">Build your measurement profile to generate custom-fit recommendations.</p>
      </section>

      <section className="row g-4">
        <div className="col-lg-7">
          <div className="glass-panel rounded-4 p-4">
            <h2 className="h5 fw-bold text-white mb-3">Body Measurements</h2>
            <div className="row g-3">
              {fieldConfig.map(([field, label, minValue]) => (
                <div className="col-md-6" key={field}>
                  <label className="form-label text-white-50 small">{label}</label>
                  <input
                    type="number"
                    min={minValue}
                    className="form-control bg-dark text-white border-white border-opacity-10"
                    value={measurements[field]}
                    onChange={(event) => updateMeasurement(field, event.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="glass-panel rounded-4 p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h2 className="h5 fw-bold text-white mb-3">AI Fit Suggestion</h2>
              <p className="text-white-75">
                Based on your current measurements, your recommended size is:
              </p>
              <div className="display-6 fw-bold text-warning">{recommendation}</div>
            </div>
            <div className="text-white-50 small mt-3">
              Save profile support is ready for MongoDB integration.
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default DesignCustomModelsPage
