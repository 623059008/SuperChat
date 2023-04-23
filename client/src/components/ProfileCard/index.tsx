import React from 'react'
import { Link } from 'react-router-dom'
import { ChatUser } from '../ChatPage/types'

import './index.css'

export interface ProfileCardProps {
  data: ChatUser
  setSelected: (id: string) => void
}

const ProfileCard: React.FC<ProfileCardProps> = ({ data, setSelected }) => {
  const { id, avatarUrl, name, description, tags } = data
  return (
    <Link to={`/chat/${id}`} onClick={() => setSelected && setSelected(id)}>
      <div className="profile-card">
        <div className="avatar-container">
          <img src={avatarUrl} alt="Avatar" className="avatar" />
        </div>
        <div className="info-container">
          <h2 className="name">{name}</h2>
          {description && <p className="description">{description.length>40 ? description.substring(0, 40) + '...' : description}</p>}
          <div className="tags">
            {tags &&
              tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProfileCard
