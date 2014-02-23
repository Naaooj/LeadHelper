package fr.naoj.leadhelper.repository;

import org.springframework.data.repository.Repository;

import fr.naoj.leadhelper.model.Meeting;

public interface MeetingRepository extends Repository<Meeting, String>, MeetingRepositoryCustom {

}
