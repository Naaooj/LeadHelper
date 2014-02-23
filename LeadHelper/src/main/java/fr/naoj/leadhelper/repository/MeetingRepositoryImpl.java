package fr.naoj.leadhelper.repository;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.mongodb.DBObject;

import fr.naoj.leadhelper.model.Meeting;

public class MeetingRepositoryImpl implements MeetingRepositoryCustom {

	@Autowired private MongoOperations op;
	
	@Override public List<Meeting> getMeetings() {
		List<Meeting> meetings = op.findAll(Meeting.class);
		Collections.sort(meetings, new Comparator<Meeting>() {
			@Override public int compare(Meeting m1, Meeting m2) {
				return m2.getMeetingDate().compareTo(m1.getMeetingDate());
			}
		});
		return meetings;
	}

	@Override public String saveOrUpdate(Meeting meeting) {
		DBObject o = (DBObject) op.getConverter().convertToMongoType(meeting);
		
		String id;
		if (meeting.getId() == null) {
			op.save(meeting);
			id = meeting.getId();
		} else {
			id = meeting.getId();
			Meeting oldMeeting = op.findById(meeting.getId(), Meeting.class);
			if (oldMeeting != null) {
				op.getCollection(op.getCollectionName(Meeting.class)).save(o);
			}
		}
		
		return id;
	}
	
	@Override public void deleteById(String meetingId) {
		if (meetingId != null) {
			op.remove(Query.query(Criteria.where("_id").is(meetingId)), Meeting.class);
		}
	}
}
