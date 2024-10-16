
import React from 'react'
import { Link } from 'react-router-dom'
import { CardContent, CardHeader, CardTitle } from '../components/cards'
import Card from '../components/cards'
import { ArrowLeft } from 'lucide-react'
const PastScans = () => {
  // Sample data for past scans
  const pastScans = [
    {
      date: '2024-09-01',
      skinCondition: 'Moderate Acne',
      imageUrl: 'path/to/image1.jpg', // Replace with actual image paths
      notes: 'Used acne treatment for two weeks.',
    },
    {
      date: '2024-08-15',
      skinCondition: 'Fine Lines',
      imageUrl: 'path/to/image2.jpg', // Replace with actual image paths
      notes: 'Started using anti-aging serum.',
    },
    {
      date: '2024-07-30',
      skinCondition: 'Dark Spots',
      imageUrl: 'path/to/image3.jpg', // Replace with actual image paths
      notes: 'Applied brightening cream.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Dashboard Link */}
        <Link to="/pages/Dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Past Scans</h1>

        {/* Past Scans List */}
        <div className="space-y-4">
          {pastScans.map((scan, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>Scan Date: {scan.date}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={scan.imageUrl} alt={`Scan from ${scan.date}`} className="w-full h-auto mb-4 rounded" />
                <p className="font-medium dark:text-gray-200">Skin Condition: {scan.skinCondition}</p>
                <p className="text-gray-600 dark:text-gray-400">Notes: {scan.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PastScans;
