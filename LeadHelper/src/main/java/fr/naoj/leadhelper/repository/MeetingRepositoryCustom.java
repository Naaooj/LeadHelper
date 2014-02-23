package fr.naoj.leadhelper.repository;

import java.util.List;

import fr.naoj.leadhelper.model.Meeting;

public interface MeetingRepositoryCustom {

	List<Meeting> getMeetings();
	
	String saveOrUpdate(Meeting meeting);
	
	void deleteById(String meetingId);
}
