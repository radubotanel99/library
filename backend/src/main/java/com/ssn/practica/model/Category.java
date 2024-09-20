package com.ssn.practica.model;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "CATEGORY")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)

//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_sequence")
//    @SequenceGenerator(name = "cat_sequence", sequenceName = "category_sequence", allocationSize = 1, initialValue = 100)
	
	private Long id;
	
	private String name;
	
	private String description;
	
	@OneToMany(mappedBy = "category")
	private List<Book> books;
	
	private boolean deleted;
	
	public Category() {
	}

	public Category(String name, String description) {
		this.name = name;
		this.description = description;
		if (this.description.isBlank()) {
			this.description = "-";
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
		if (this.description.isBlank()) {
			this.description = "-";
		}
	}

	public boolean isDeletd() {
		return deleted;
	}
	
	public void setDeletd(boolean deletd) {
		this.deleted = deletd;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Category other = (Category) obj;
		return Objects.equals(id, other.id);
	}
}
